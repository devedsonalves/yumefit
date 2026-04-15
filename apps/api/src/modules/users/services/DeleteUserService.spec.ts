import DeleteUserService from '@modules/users/services/DeleteUserService'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider'

import AppError from '@shared/errors/AppError'

let deleteUserService: DeleteUserService

let fakeUsersRepository: FakeUsersRepository
let fakeCacheProvider: FakeCacheProvider

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeCacheProvider = new FakeCacheProvider()

    deleteUserService = new DeleteUserService(fakeUsersRepository, fakeCacheProvider)
  })

  it('should be able to delete an existing user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: 'hashed-password',
    })

    await deleteUserService.execute({ user_id: user.id })

    const deletedUser = await fakeUsersRepository.findById(user.id)

    expect(deletedUser).toBeUndefined()
  })

  it('should invalidate the users-list cache after deletion', async () => {
    const invalidateSpy = jest.spyOn(fakeCacheProvider, 'invalidate')

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: 'hashed-password',
    })

    await deleteUserService.execute({ user_id: user.id })

    expect(invalidateSpy).toHaveBeenCalledWith('users-list')
  })

  it('should not be able to delete a non-existing user', async () => {
    await expect(
      deleteUserService.execute({ user_id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
