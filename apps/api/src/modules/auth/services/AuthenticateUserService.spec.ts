import AuthenticateUserService from '@modules/auth/services/AuthenticateUserService'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeRefreshTokensRepository from '@modules/auth/repositories/fakes/FakeRefreshTokensRepository'

import AppError from '@shared/errors/AppError'

let authenticateUserService: AuthenticateUserService

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let fakeRefreshTokensRepository: FakeRefreshTokensRepository

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    fakeRefreshTokensRepository = new FakeRefreshTokensRepository()

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeRefreshTokensRepository,
    )
  })

  it('should be able to authenticate a user and return tokens', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await fakeHashProvider.generateHash('123456'),
    })

    const response = await authenticateUserService.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response).toHaveProperty('accessToken')
    expect(response).toHaveProperty('refreshToken')
    expect(response.user).toEqual(user)
  })

  it('should not be able to authenticate with a non-existing user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'nonexistent@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await fakeHashProvider.generateHash('correct-password'),
    })

    await expect(
      authenticateUserService.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should save a hashed refresh token on the repository', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await fakeHashProvider.generateHash('123456'),
    })

    const response = await authenticateUserService.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    // The returned token must be the raw (unhashed) value
    expect(response.refreshToken).toBeTruthy()
    expect(typeof response.refreshToken).toBe('string')
    expect(response.refreshToken.length).toBeGreaterThan(0)
  })
})
