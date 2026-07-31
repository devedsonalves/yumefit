import 'reflect-metadata'

import crypto from 'crypto'
import { inject, injectable } from 'tsyringe'

import IRefreshTokensRepository from '@modules/auth/repositories/IRefreshTokensRepository'

@injectable()
class LogoutService {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,
  ) {}

  public async execute({ refreshToken }: { refreshToken?: string }): Promise<void> {
    if (!refreshToken) {
      return
    }

    const hashedRefreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex')

    await this.refreshTokensRepository.invalidateToken(hashedRefreshToken)
  }
}

export default LogoutService
