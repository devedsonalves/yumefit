import 'reflect-metadata'

import { injectable, inject } from 'tsyringe'

import User from '@modules/users/infrastructure/typeorm/entities/User'
import IUserRepository from '@modules/users/repositories/ICreateUsersRepository'
import { UserRole } from '@modules/users/types/UserRole'
import AppError from '@shared/errors/AppError'

interface IRequest {
  user_id: string
  requester_id: string
  requester_role: UserRole
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ user_id, requester_id, requester_role }: IRequest): Promise<User> {
    if (requester_id !== user_id && requester_role !== 'admin') {
      throw new AppError('User is not allowed to view this profile.', 403)
    }

    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    return user
  }
}

export default ShowUserService
