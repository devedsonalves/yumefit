import 'reflect-metadata'

import { injectable, inject } from 'tsyringe'
import IUserRepository from '@modules/users/repositories/ICreateUsersRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import { UserRole } from '@modules/users/types/UserRole'
import AppError from '@shared/errors/AppError'

interface IRequest {
  user_id: string
  requester_role: UserRole
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id, requester_role }: IRequest): Promise<void> {
    if (requester_role !== 'admin') {
      throw new AppError('Only administrators can delete users.', 403)
    }

    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    await this.usersRepository.delete(user_id)
    await this.cacheProvider.invalidate('users-list')
  }
}

export default DeleteUserService
