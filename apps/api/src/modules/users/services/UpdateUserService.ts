import 'reflect-metadata'

import { injectable, inject } from 'tsyringe'

import IUserRepository from '@modules/users/repositories/ICreateUsersRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

import User from '@modules/users/infrastructure/typeorm/entities/User'
import AppError from '@shared/errors/AppError'

interface IRequest {
  user_id: string
  name: string
  email: string
  password?: string
  role?: string
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id, name, email, password, role }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email)

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('Email already in use.')
    }

    user.name = name
    user.email = email

    if (role) {
      user.role = role
    }

    if (password) {
      user.password_hash = await this.hashProvider.generateHash(password)
    }

    await this.usersRepository.save(user)
    await this.cacheProvider.invalidate('users-list')

    return user
  }
}

export default UpdateUserService
