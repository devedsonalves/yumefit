import ShowUserService from '@modules/users/services/ShowUserService'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

import AppError from '@shared/errors/AppError'

let showUserService: ShowUserService

let fakeUsersRepository: FakeUsersRepository

describe('ShowUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    showUserService = new ShowUserService(fakeUsersRepository)
  })

  it('should be able to find and return an existing user by id', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password_hash: 'hashed-password',
    })

    const foundUser = await showUserService.execute({ user_id: user.id })

    expect(foundUser.id).toBe(user.id)
    expect(foundUser.name).toBe('Jane Doe')
    expect(foundUser.email).toBe('janedoe@example.com')
  })

  it('should not be able to find a non-existing user', async () => {
    await expect(
      showUserService.execute({ user_id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
