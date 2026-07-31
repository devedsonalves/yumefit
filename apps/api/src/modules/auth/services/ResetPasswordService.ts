import 'reflect-metadata'

import crypto from 'crypto'
import { inject, injectable } from 'tsyringe'

import IAuthActionTokensRepository from '@modules/auth/repositories/IAuthActionTokensRepository'
import IRefreshTokensRepository from '@modules/auth/repositories/IRefreshTokensRepository'
import IUsersRepository from '@modules/users/repositories/ICreateUsersRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import AppError from '@shared/errors/AppError'

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
    @inject('AuthActionTokensRepository')
    private authActionTokensRepository: IAuthActionTokensRepository,
    @inject('RefreshTokensRepository') private refreshTokensRepository: IRefreshTokensRepository,
  ) {}

  public async execute({ token, password }: { token: string; password: string }): Promise<void> {
    if (password.length < 8) {
      throw new AppError('Password must contain at least 8 characters.', 400)
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const actionToken = await this.authActionTokensRepository.findValidByToken(
      hashedToken,
      'password_reset',
    )

    if (!actionToken) {
      throw new AppError('Password reset token is invalid or expired.', 400)
    }

    const user = await this.usersRepository.findById(actionToken.user_id)
    if (!user) throw new AppError('User not found.', 404)

    user.password_hash = await this.hashProvider.generateHash(password)
    await this.usersRepository.save(user)
    await this.authActionTokensRepository.markAsUsed(actionToken.id)
    await this.refreshTokensRepository.invalidateByUserId(user.id)
  }
}

export default ResetPasswordService
