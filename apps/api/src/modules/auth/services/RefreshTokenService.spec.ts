import RefreshTokenService from '@modules/auth/services/RefreshTokenService'
import FakeRefreshTokensRepository from '@modules/auth/repositories/fakes/FakeRefreshTokensRepository'

import AppError from '@shared/errors/AppError'

import crypto from 'crypto'

let refreshTokenService: RefreshTokenService
let fakeRefreshTokensRepository: FakeRefreshTokensRepository

describe('RefreshToken', () => {
  beforeEach(() => {
    fakeRefreshTokensRepository = new FakeRefreshTokensRepository()

    refreshTokenService = new RefreshTokenService(fakeRefreshTokensRepository)
  })

  it('should be able to refresh the access token and rotate the refresh token', async () => {
    const rawToken = crypto.randomBytes(40).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex')

    await fakeRefreshTokensRepository.create({
      user_id: 'user-id-1',
      hashedToken,
    })

    const response = await refreshTokenService.execute({ refreshToken: rawToken })

    expect(response).toHaveProperty('accessToken')
    expect(response).toHaveProperty('refreshToken')
    expect(response.refreshToken).not.toBe(rawToken)
  })

  it('should invalidate the old refresh token after rotation', async () => {
    const rawToken = crypto.randomBytes(40).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex')

    await fakeRefreshTokensRepository.create({
      user_id: 'user-id-1',
      hashedToken,
    })

    await refreshTokenService.execute({ refreshToken: rawToken })

    const revokedToken = await fakeRefreshTokensRepository.findByToken(hashedToken)

    expect(revokedToken).toBeDefined()
    expect(revokedToken?.revoked).toBe(true)
  })

  it('should not be able to refresh with a non-existing token', async () => {
    const fakeToken = crypto.randomBytes(40).toString('hex')

    await expect(refreshTokenService.execute({ refreshToken: fakeToken })).rejects.toBeInstanceOf(
      AppError,
    )
  })

  it('should not be able to refresh with a revoked token', async () => {
    const rawToken = crypto.randomBytes(40).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex')

    await fakeRefreshTokensRepository.create({
      user_id: 'user-id-1',
      hashedToken,
    })

    await fakeRefreshTokensRepository.invalidateToken(hashedToken)

    await expect(refreshTokenService.execute({ refreshToken: rawToken })).rejects.toBeInstanceOf(
      AppError,
    )
  })

  it('should not be able to refresh with an expired token', async () => {
    const rawToken = crypto.randomBytes(40).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex')

    const refreshToken = await fakeRefreshTokensRepository.create({
      user_id: 'user-id-1',
      hashedToken,
    })

    const eightDaysAgo = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
    refreshToken.created_at = eightDaysAgo

    await expect(refreshTokenService.execute({ refreshToken: rawToken })).rejects.toBeInstanceOf(
      AppError,
    )
  })
})
