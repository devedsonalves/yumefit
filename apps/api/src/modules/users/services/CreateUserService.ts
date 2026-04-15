import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'

import IUserRepository from '@modules/users/repositories/ICreateUsersRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

import User from '@modules/users/infrastructure/typeorm/entities/User'

import AppError from '@shared/errors/AppError'

interface IRequest {
  name: string
  email: string
  password: string
  auth_provider?: string
}

@injectable()
class CreateUserService {
  private usersRepository: IUserRepository
  private hashProvider: IHashProvider
  private cacheProvider: ICacheProvider

  constructor(
    @inject('UsersRepository')
    usersRepository: IUserRepository,

    @inject('HashProvider')
    hashProvider: IHashProvider,

    @inject('CacheProvider')
    cacheProvider: ICacheProvider,
  ) {
    this.usersRepository = usersRepository
    this.hashProvider = hashProvider
    this.cacheProvider = cacheProvider
  }

  public async execute({ name, email, password, auth_provider }: IRequest): Promise<User> {
    if (await this.usersRepository.findByEmail(email)) {
      throw new AppError('Email address already used.', 401)
    }

    const hash_password = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: hash_password,
      auth_provider,
    })

    await this.cacheProvider.invalidate('users-list')

    return user
  }
}

export default CreateUserService
