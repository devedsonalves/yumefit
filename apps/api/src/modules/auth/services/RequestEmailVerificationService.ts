import 'reflect-metadata'

import crypto from 'crypto'
import { inject, injectable } from 'tsyringe'

import authConfig from '@config/auth'
import IAuthActionTokensRepository from '@modules/auth/repositories/IAuthActionTokensRepository'
import IUsersRepository from '@modules/users/repositories/ICreateUsersRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import AppError from '@shared/errors/AppError'

@injectable()
class RequestEmailVerificationService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('AuthActionTokensRepository')
    private authActionTokensRepository: IAuthActionTokensRepository,
    @inject('MailProvider') private mailProvider: IMailProvider,
  ) {}

  public async execute({ user_id }: { user_id: string }): Promise<void> {
    const user = await this.usersRepository.findById(user_id)
    if (!user) throw new AppError('User not found.', 404)
    if (user.email_verified_at) return

    await this.authActionTokensRepository.invalidateByUserId(user.id, 'email_verification')

    const token = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    await this.authActionTokensRepository.create({
      user_id: user.id,
      hashedToken,
      type: 'email_verification',
      expires_at: new Date(Date.now() + authConfig.emailVerificationTokenMaxAge),
    })

    await this.mailProvider.sendMail({
      to: user.email,
      subject: 'Verify your YumeFit email',
      body: `Use this email verification token: ${token}`,
    })
  }
}

export default RequestEmailVerificationService
