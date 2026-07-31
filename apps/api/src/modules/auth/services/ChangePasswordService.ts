import 'reflect-metadata'

import { inject, injectable } from 'tsyringe'

import IRefreshTokensRepository from '@modules/auth/repositories/IRefreshTokensRepository'
import IUsersRepository from '@modules/users/repositories/ICreateUsersRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import AppError from '@shared/errors/AppError'

@injectable()
class ChangePasswordService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
    @inject('RefreshTokensRepository') private refreshTokensRepository: IRefreshTokensRepository,
  ) {}

  public async execute({
    user_id,
    currentPassword,
    newPassword,
  }: {
    user_id: string
    currentPassword: string
    newPassword: string
  }): Promise<void> {
    if (newPassword.length < 8) {
      throw new AppError('Password must contain at least 8 characters.', 400)
    }

    const user = await this.usersRepository.findById(user_id)

    if (!user || !(await this.hashProvider.compareHash(currentPassword, user.password_hash))) {
      throw new AppError('Current password is incorrect.', 401)
    }

    user.password_hash = await this.hashProvider.generateHash(newPassword)
    await this.usersRepository.save(user)
    await this.refreshTokensRepository.invalidateByUserId(user_id)
  }
}

export default ChangePasswordService
