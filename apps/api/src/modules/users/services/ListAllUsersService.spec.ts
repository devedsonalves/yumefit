import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider'

import ListAllUsersService from '@modules/users/services/ListAllUsersService'

let listAllUsersService: ListAllUsersService

let usersRepository: FakeUsersRepository
let cacheProvider: FakeCacheProvider

describe('List All Users', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository()
    cacheProvider = new FakeCacheProvider()

    listAllUsersService = new ListAllUsersService(usersRepository, cacheProvider)
  })

  it('should be able list all users', async () => {
    const iterable = Array.from({ length: 5 }, (_, index) => index)

    const users = await Promise.all(
      iterable.map(async (item) =>
        usersRepository.create({
          name: `user-${item}`,
          email: 'user-email',
          password_hash: 'user-password',
        }),
      ),
    )

    const allUsers = await listAllUsersService.execute()

    expect(allUsers).toEqual([...users])
  })

  it('should be able to list all users in redis cache', async () => {
    const iterable = Array.from({ length: 5 }, (_, index) => index)

    const users = await Promise.all(
      iterable.map(async (item) =>
        usersRepository.create({
          name: `user-${item}`,
          email: 'user-email',
          password_hash: 'user-password',
        }),
      ),
    )

    await cacheProvider.save({
      key: 'users-list',
      value: users,
    })

    const cacheData = await cacheProvider.recovery('users-list')

    await expect(cacheData).toEqual([...users])
  })
})
