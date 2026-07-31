import 'reflect-metadata'

import crypto from 'crypto'
import { inject, injectable } from 'tsyringe'

import IAuthActionTokensRepository from '@modules/auth/repositories/IAuthActionTokensRepository'
import IUsersRepository from '@modules/users/repositories/ICreateUsersRepository'
import AppError from '@shared/errors/AppError'

@injectable()
class VerifyEmailService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('AuthActionTokensRepository')
    private authActionTokensRepository: IAuthActionTokensRepository,
  ) {}

  public async execute({ token }: { token: string }): Promise<void> {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const actionToken = await this.authActionTokensRepository.findValidByToken(
      hashedToken,
      'email_verification',
    )

    if (!actionToken) throw new AppError('Email verification token is invalid or expired.', 400)

    const user = await this.usersRepository.findById(actionToken.user_id)
    if (!user) throw new AppError('User not found.', 404)

    user.email_verified_at = new Date()
    await this.usersRepository.save(user)
    await this.authActionTokensRepository.markAsUsed(actionToken.id)
  }
}

export default VerifyEmailService
