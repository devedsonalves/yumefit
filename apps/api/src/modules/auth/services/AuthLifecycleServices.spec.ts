import crypto from 'crypto'

import ChangePasswordService from '@modules/auth/services/ChangePasswordService'
import ListSessionsService from '@modules/auth/services/ListSessionsService'
import LogoutAllSessionsService from '@modules/auth/services/LogoutAllSessionsService'
import RequestEmailVerificationService from '@modules/auth/services/RequestEmailVerificationService'
import RequestPasswordResetService from '@modules/auth/services/RequestPasswordResetService'
import ResetPasswordService from '@modules/auth/services/ResetPasswordService'
import RevokeSessionService from '@modules/auth/services/RevokeSessionService'
import VerifyEmailService from '@modules/auth/services/VerifyEmailService'
import FakeAuthActionTokensRepository from '@modules/auth/repositories/fakes/FakeAuthActionTokensRepository'
import FakeRefreshTokensRepository from '@modules/auth/repositories/fakes/FakeRefreshTokensRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import AppError from '@shared/errors/AppError'

const rawTokenFromLastMessage = (mailProvider: FakeMailProvider) =>
  mailProvider.messages.at(-1)!.body.split(': ').at(-1)!

describe('Auth lifecycle services', () => {
  let usersRepository: FakeUsersRepository
  let hashProvider: FakeHashProvider
  let refreshTokensRepository: FakeRefreshTokensRepository
  let actionTokensRepository: FakeAuthActionTokensRepository
  let mailProvider: FakeMailProvider

  beforeEach(() => {
    usersRepository = new FakeUsersRepository()
    hashProvider = new FakeHashProvider()
    refreshTokensRepository = new FakeRefreshTokensRepository()
    actionTokensRepository = new FakeAuthActionTokensRepository()
    mailProvider = new FakeMailProvider()
  })

  it('should change a password and revoke active sessions', async () => {
    const user = await usersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password_hash: await hashProvider.generateHash('old-password'),
    })
    await refreshTokensRepository.create({ user_id: user.id, hashedToken: 'session-token' })

    const service = new ChangePasswordService(
      usersRepository,
      hashProvider,
      refreshTokensRepository,
    )
    await service.execute({
      user_id: user.id,
      currentPassword: 'old-password',
      newPassword: 'new-password',
    })

    expect(await hashProvider.compareHash('new-password', user.password_hash)).toBe(true)
    expect(await refreshTokensRepository.findActiveByUserId(user.id)).toHaveLength(0)
  })

  it('should reject a password change when the current password is incorrect', async () => {
    const user = await usersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password_hash: await hashProvider.generateHash('old-password'),
    })
    const service = new ChangePasswordService(
      usersRepository,
      hashProvider,
      refreshTokensRepository,
    )

    await expect(
      service.execute({
        user_id: user.id,
        currentPassword: 'wrong-password',
        newPassword: 'new-password',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should request and complete a password reset', async () => {
    const user = await usersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password_hash: await hashProvider.generateHash('old-password'),
    })
    await refreshTokensRepository.create({ user_id: user.id, hashedToken: 'session-token' })

    const requestService = new RequestPasswordResetService(
      usersRepository,
      actionTokensRepository,
      mailProvider,
    )
    await requestService.execute({ email: ' JOHN@EXAMPLE.COM ' })

    const resetService = new ResetPasswordService(
      usersRepository,
      hashProvider,
      actionTokensRepository,
      refreshTokensRepository,
    )
    const token = rawTokenFromLastMessage(mailProvider)
    await resetService.execute({ token, password: 'new-password' })

    expect(await hashProvider.compareHash('new-password', user.password_hash)).toBe(true)
    expect(await refreshTokensRepository.findActiveByUserId(user.id)).toHaveLength(0)
    await expect(resetService.execute({ token, password: 'another-password' })).rejects.toBeInstanceOf(
      AppError,
    )
  })

  it('should not reveal whether a password reset email exists', async () => {
    const service = new RequestPasswordResetService(
      usersRepository,
      actionTokensRepository,
      mailProvider,
    )
    await expect(service.execute({ email: 'missing@example.com' })).resolves.toBeUndefined()
    expect(mailProvider.messages).toHaveLength(0)
  })

  it('should request and confirm email verification', async () => {
    const user = await usersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password_hash: 'password',
    })
    const requestService = new RequestEmailVerificationService(
      usersRepository,
      actionTokensRepository,
      mailProvider,
    )
    await requestService.execute({ user_id: user.id })

    const verifyService = new VerifyEmailService(usersRepository, actionTokensRepository)
    const token = rawTokenFromLastMessage(mailProvider)
    await verifyService.execute({ token })

    expect(user.email_verified_at).toBeInstanceOf(Date)
    await expect(verifyService.execute({ token })).rejects.toBeInstanceOf(AppError)
  })

  it('should list, revoke and logout all sessions', async () => {
    const first = await refreshTokensRepository.create({
      user_id: 'user-id',
      hashedToken: crypto.randomBytes(8).toString('hex'),
    })
    await refreshTokensRepository.create({
      user_id: 'user-id',
      hashedToken: crypto.randomBytes(8).toString('hex'),
    })

    const listService = new ListSessionsService(refreshTokensRepository)
    const revokeService = new RevokeSessionService(refreshTokensRepository)
    const logoutAllService = new LogoutAllSessionsService(refreshTokensRepository)

    expect(await listService.execute({ user_id: 'user-id' })).toHaveLength(2)
    await revokeService.execute({ user_id: 'user-id', session_id: first.id })
    expect(await listService.execute({ user_id: 'user-id' })).toHaveLength(1)
    await logoutAllService.execute({ user_id: 'user-id' })
    expect(await listService.execute({ user_id: 'user-id' })).toHaveLength(0)
  })
})
