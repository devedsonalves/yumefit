import ShowProfileService from '@modules/users/services/ShowProfileService'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

import AppError from '@shared/errors/AppError'

let showProfileService: ShowProfileService

let fakeUsersRepository: FakeUsersRepository

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    showProfileService = new ShowProfileService(fakeUsersRepository)
  })

  it('should be able to show the profile of an existing user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: 'hashed-password',
    })

    const profile = await showProfileService.execute({ user_id: user.id })

    expect(profile.id).toBe(user.id)
    expect(profile.name).toBe('John Doe')
    expect(profile.email).toBe('johndoe@example.com')
  })

  it('should not be able to show the profile of a non-existing user', async () => {
    await expect(
      showProfileService.execute({ user_id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
