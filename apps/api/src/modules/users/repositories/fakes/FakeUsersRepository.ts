import { v4 as uuid } from 'uuid'

import User from '@modules/users/infrastructure/typeorm/entities/User'

import ICreateUsersRepository from '@modules/users/repositories/ICreateUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

class FakeUsersRepository implements ICreateUsersRepository {
  private users: User[] = []

  public async create({ name, email, password_hash, auth_provider }: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, {
      id: uuid(),
      name,
      email,
      password_hash,
      auth_provider: auth_provider || 'local',
      role: 'user',
      created_at: new Date(),
      email_verified_at: null,
    })

    this.users.push(user)

    return user
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex((storedUser) => storedUser.id === user.id)

    this.users[findIndex] = user

    return user
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((userStored) => userStored.id === id)

    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((userStored) => userStored.email === email)

    return user
  }

  public async findAll(): Promise<User[] | undefined> {
    const users = this.users

    return users
  }

  public async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id)
  }
}

export default FakeUsersRepository
