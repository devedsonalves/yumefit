import 'reflect-metadata'

import crypto from 'crypto'
import { inject, injectable } from 'tsyringe'

import authConfig from '@config/auth'
import IAuthActionTokensRepository from '@modules/auth/repositories/IAuthActionTokensRepository'
import IUsersRepository from '@modules/users/repositories/ICreateUsersRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'

@injectable()
class RequestPasswordResetService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('AuthActionTokensRepository')
    private authActionTokensRepository: IAuthActionTokensRepository,
    @inject('MailProvider') private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: { email: string }): Promise<void> {
    const normalizedEmail = email.trim().toLowerCase()
    const user = await this.usersRepository.findByEmail(normalizedEmail)

    if (!user) return

    await this.authActionTokensRepository.invalidateByUserId(user.id, 'password_reset')

    const token = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    await this.authActionTokensRepository.create({
      user_id: user.id,
      hashedToken,
      type: 'password_reset',
      expires_at: new Date(Date.now() + authConfig.passwordResetTokenMaxAge),
    })

    await this.mailProvider.sendMail({
      to: user.email,
      subject: 'YumeFit password reset',
      body: `Use this password reset token: ${token}`,
    })
  }
}

export default RequestPasswordResetService
