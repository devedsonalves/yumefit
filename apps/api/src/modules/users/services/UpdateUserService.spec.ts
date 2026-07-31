import UpdateUserService from '@modules/users/services/UpdateUserService'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider'
import FakeRefreshTokensRepository from '@modules/auth/repositories/fakes/FakeRefreshTokensRepository'

import AppError from '@shared/errors/AppError'

let updateUserService: UpdateUserService

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let fakeCacheProvider: FakeCacheProvider
let fakeRefreshTokensRepository: FakeRefreshTokensRepository

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    fakeCacheProvider = new FakeCacheProvider()
    fakeRefreshTokensRepository = new FakeRefreshTokensRepository()

    updateUserService = new UpdateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
      fakeRefreshTokensRepository,
    )
  })

  it('should be able to update name and email of an existing user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: 'hashed-password',
    })

    const updatedUser = await updateUserService.execute({
      user_id: user.id,
      requester_id: user.id,
      requester_role: 'user',
      name: 'John Updated',
      email: 'johndoe@example.com',
    })

    expect(updatedUser.name).toBe('John Updated')
    expect(updatedUser.email).toBe('johndoe@example.com')
  })

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await fakeHashProvider.generateHash('old-password'),
    })

    const updatedUser = await updateUserService.execute({
      user_id: user.id,
      requester_id: user.id,
      requester_role: 'user',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'new-password',
    })

    const passwordMatches = await fakeHashProvider.compareHash(
      'new-password',
      updatedUser.password_hash,
    )

    expect(passwordMatches).toBe(true)
  })

  it('should be able to update the user role', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: 'hashed-password',
    })

    const updatedUser = await updateUserService.execute({
      user_id: user.id,
      requester_id: user.id,
      requester_role: 'admin',
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'admin',
    })

    expect(updatedUser.role).toBe('admin')
  })

  it('should invalidate the users-list cache after update', async () => {
    const invalidateSpy = jest.spyOn(fakeCacheProvider, 'invalidate')

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: 'hashed-password',
    })

    await updateUserService.execute({
      user_id: user.id,
      requester_id: user.id,
      requester_role: 'user',
      name: 'John Updated',
      email: 'johndoe@example.com',
    })

    expect(invalidateSpy).toHaveBeenCalledWith('users-list')
  })

  it('should not be able to update a non-existing user', async () => {
    await expect(
      updateUserService.execute({
        user_id: 'non-existing-id',
        requester_id: 'non-existing-id',
        requester_role: 'user',
        name: 'Ghost',
        email: 'ghost@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update email to one already used by another user', async () => {
    await fakeUsersRepository.create({
      name: 'User One',
      email: 'userone@example.com',
      password_hash: 'hashed-password',
    })

    const userTwo = await fakeUsersRepository.create({
      name: 'User Two',
      email: 'usertwo@example.com',
      password_hash: 'hashed-password',
    })

    await expect(
      updateUserService.execute({
        user_id: userTwo.id,
        requester_id: userTwo.id,
        requester_role: 'user',
        name: 'User Two',
        email: 'userone@example.com', // email already taken
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should revoke active sessions after a password change', async () => {
    const invalidateByUserIdSpy = jest.spyOn(fakeRefreshTokensRepository, 'invalidateByUserId')
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: 'hashed-password',
    })

    await updateUserService.execute({
      user_id: user.id,
      requester_id: user.id,
      requester_role: 'user',
      name: user.name,
      email: user.email,
      password: 'new-password',
    })

    expect(invalidateByUserIdSpy).toHaveBeenCalledWith(user.id)
  })

  it('should not allow a user to update another user', async () => {
    await expect(
      updateUserService.execute({
        user_id: 'other-user-id',
        requester_id: 'user-id',
        requester_role: 'user',
        name: 'Other User',
        email: 'other@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not allow a user to update roles', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: 'hashed-password',
    })

    await expect(
      updateUserService.execute({
        user_id: user.id,
        requester_id: user.id,
        requester_role: 'user',
        name: user.name,
        email: user.email,
        role: 'admin',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
