import 'reflect-metadata'

import { injectable, inject } from 'tsyringe'

import IUsersRepository from '@modules/users/repositories/ICreateUsersRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

import User from '@modules/users/infrastructure/typeorm/entities/User'
import { UserRole } from '@modules/users/types/UserRole'
import AppError from '@shared/errors/AppError'

@injectable()
class ListAllUsersService {
  private usersRepository: IUsersRepository
  private cacheProvider: ICacheProvider

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('CacheProvider')
    cacheProvider: ICacheProvider,
  ) {
    this.usersRepository = usersRepository
    this.cacheProvider = cacheProvider
  }

  public async execute({ requester_role }: { requester_role: UserRole }): Promise<User[] | undefined> {
    if (requester_role !== 'admin') {
      throw new AppError('Only administrators can list users.', 403)
    }

    const users = await this.cacheProvider.recovery<User[]>('users-list')

    if (!users) {
      const users = await this.usersRepository.findAll()

      await this.cacheProvider.save({
        key: 'users-list',
        value: users,
      })

      return users
    }

    return users
  }
}

export default ListAllUsersService
