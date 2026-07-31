import 'reflect-metadata'

import { sign } from 'jsonwebtoken'
import { injectable, inject } from 'tsyringe'
import crypto from 'crypto'
import authConfig from '@config/auth'

import IRefreshTokensRepository from '@modules/auth/repositories/IRefreshTokensRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  refreshToken: string
}

interface IResponse {
  accessToken: string
  refreshToken: string
}

@injectable()
class RefreshTokenService {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,
  ) {}

  public async execute({ refreshToken }: IRequest): Promise<IResponse> {
    const hashedRefreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex')

    const refreshTokenExists = await this.refreshTokensRepository.findByToken(hashedRefreshToken)

    if (!refreshTokenExists) {
      throw new AppError('Refresh token not found', 401)
    }

    if (refreshTokenExists.revoked) {
      throw new AppError('Refresh token revoked', 401)
    }

    if (Date.now() - refreshTokenExists.created_at.getTime() > authConfig.refreshTokenMaxAge) {
      await this.refreshTokensRepository.invalidateToken(hashedRefreshToken)
      throw new AppError('Refresh token expired', 401)
    }

    await this.refreshTokensRepository.invalidateToken(hashedRefreshToken)

    const accessToken = sign({}, authConfig.secret, {
      subject: refreshTokenExists.user_id,
      expiresIn: authConfig.accessTokenExpiresIn,
    })

    const newRefreshTokenValue = crypto.randomBytes(40).toString('hex')
    const newHashedRefreshToken = crypto
      .createHash('sha256')
      .update(newRefreshTokenValue)
      .digest('hex')

    await this.refreshTokensRepository.create({
      user_id: refreshTokenExists.user_id,
      hashedToken: newHashedRefreshToken,
    })

    return {
      accessToken,
      refreshToken: newRefreshTokenValue,
    }
  }
}

export default RefreshTokenService
