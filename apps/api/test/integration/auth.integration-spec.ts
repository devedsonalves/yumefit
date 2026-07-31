import crypto from 'crypto'
import Redis from 'ioredis'
import request from 'supertest'
import { Connection } from 'typeorm'

import { app } from '@shared/infrastructure/http/app'
import { databaseConnection } from '@shared/infrastructure/typeorm'

const hashToken = (token: string) => crypto.createHash('sha256').update(token).digest('hex')

describe('Authentication HTTP integration', () => {
  let connection: Connection
  let redis: Redis.Redis

  beforeAll(async () => {
    const activeConnection = await databaseConnection
    if (!activeConnection) throw new Error('Integration database connection failed.')

    connection = activeConnection
    redis = new Redis({ host: 'localhost', port: 56379 })
  })

  beforeEach(async () => {
    await connection.query('TRUNCATE TABLE auth_action_tokens, refresh_tokens, users CASCADE')
    await redis.flushdb()
  })

  afterAll(async () => {
    redis.disconnect()
    await connection.close()
  })

  async function createUser(email: string, password = 'password123') {
    const response = await request(app).post('/users').send({
      name: 'Integration User',
      email,
      password,
    })

    expect(response.status).toBe(200)
    return response.body
  }

  async function login(email: string, password = 'password123') {
    const agent = request.agent(app)
    const response = await agent.post('/auth/login').send({ email, password })
    expect(response.status).toBe(200)
    return agent
  }

  it('handles cookies, refresh rotation, logout and CORS', async () => {
    const email = 'cookies@example.com'
    await createUser(email)
    const agent = await login(email)

    const me = await agent.get('/auth/me')
    expect(me.status).toBe(200)
    expect(me.body.user.email).toBe(email)

    expect((await agent.post('/auth/refresh')).status).toBe(204)
    expect((await agent.post('/auth/logout')).status).toBe(204)
    expect((await agent.post('/auth/refresh')).status).toBe(401)

    const cors = await request(app)
      .options('/auth/login')
      .set('Origin', 'http://localhost:5173')
      .set('Access-Control-Request-Method', 'POST')

    expect(cors.status).toBe(204)
    expect(cors.headers['access-control-allow-origin']).toBe('http://localhost:5173')
    expect(cors.headers['access-control-allow-credentials']).toBe('true')
  })

  it('enforces user and admin permissions', async () => {
    const user = await createUser('user@example.com')
    const otherUser = await createUser('other@example.com')
    const admin = await createUser('admin@example.com')

    await connection.query(`UPDATE users SET role = 'admin' WHERE id = $1`, [admin.id])

    const userAgent = await login('user@example.com')
    const adminAgent = await login('admin@example.com')

    expect((await userAgent.get(`/users/${user.id}`)).status).toBe(200)
    expect((await userAgent.get(`/users/${otherUser.id}`)).status).toBe(403)
    expect((await userAgent.get('/users')).status).toBe(403)

    const roleEscalation = await userAgent.put(`/users/${user.id}`).send({
      name: 'Integration User',
      email: 'user@example.com',
      role: 'admin',
    })
    expect(roleEscalation.status).toBe(403)

    expect((await adminAgent.get('/users')).status).toBe(200)

    const promoteUser = await adminAgent.put(`/users/${otherUser.id}`).send({
      name: 'Integration User',
      email: 'other@example.com',
      role: 'admin',
    })
    expect(promoteUser.status).toBe(200)
    expect(promoteUser.body.role).toBe('admin')

    expect((await adminAgent.delete(`/users/${user.id}`)).status).toBe(204)
  })

  it('handles password reset, email verification and session revocation', async () => {
    const email = 'lifecycle@example.com'
    const user = await createUser(email)
    const firstAgent = await login(email)

    const verificationToken = 'email-verification-token'
    await connection.query(
      `INSERT INTO auth_action_tokens ("user_id", "hashedToken", "type", "expires_at")
       VALUES ($1, $2, 'email_verification', NOW() + INTERVAL '1 hour')`,
      [user.id, hashToken(verificationToken)],
    )

    expect(
      (
        await request(app)
          .post('/auth/email-verification/confirm')
          .send({ token: verificationToken })
      ).status,
    ).toBe(204)

    const me = await firstAgent.get('/auth/me')
    expect(me.body.user.email_verified_at).toBeTruthy()

    const resetToken = 'password-reset-token'
    await connection.query(
      `INSERT INTO auth_action_tokens ("user_id", "hashedToken", "type", "expires_at")
       VALUES ($1, $2, 'password_reset', NOW() + INTERVAL '1 hour')`,
      [user.id, hashToken(resetToken)],
    )

    expect(
      (
        await request(app)
          .post('/auth/password-reset/confirm')
          .send({ token: resetToken, password: 'newpassword123' })
      ).status,
    ).toBe(204)
    expect((await firstAgent.post('/auth/refresh')).status).toBe(401)

    const secondAgent = await login(email, 'newpassword123')
    await login(email, 'newpassword123')

    const sessions = await secondAgent.get('/auth/sessions')
    expect(sessions.status).toBe(200)
    expect(sessions.body.sessions).toHaveLength(2)

    expect((await secondAgent.delete(`/auth/sessions/${sessions.body.sessions[0].id}`)).status).toBe(
      204,
    )
    expect((await secondAgent.get('/auth/sessions')).body.sessions).toHaveLength(1)

    expect((await secondAgent.post('/auth/logout-all')).status).toBe(204)
    expect((await secondAgent.post('/auth/refresh')).status).toBe(401)
  })
})
