import UpdateUserService from '@modules/users/services/UpdateUserService'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider'

import AppError from '@shared/errors/AppError'

let updateUserService: UpdateUserService

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let fakeCacheProvider: FakeCacheProvider

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    fakeCacheProvider = new FakeCacheProvider()

    updateUserService = new UpdateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
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
      name: 'John Updated',
      email: 'johndoe@example.com',
    })

    expect(invalidateSpy).toHaveBeenCalledWith('users-list')
  })

  it('should not be able to update a non-existing user', async () => {
    await expect(
      updateUserService.execute({
        user_id: 'non-existing-id',
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
        name: 'User Two',
        email: 'userone@example.com', // email already taken
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
