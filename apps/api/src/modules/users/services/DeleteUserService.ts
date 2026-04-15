import 'reflect-metadata'

import { injectable, inject } from 'tsyringe'
import IUserRepository from '@modules/users/repositories/ICreateUsersRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'

interface IRequest {
  user_id: string
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    await this.usersRepository.delete(user_id)
    await this.cacheProvider.invalidate('users-list')
  }
}

export default DeleteUserService
