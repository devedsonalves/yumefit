import 'reflect-metadata'

import { sign } from 'jsonwebtoken'
import { injectable, inject } from 'tsyringe'
import crypto from 'crypto'
import authConfig from '@config/auth'

import User from '@modules/users/infrastructure/typeorm/entities/User'
import IUsersRepository from '@modules/users/repositories/ICreateUsersRepository'
import IRefreshTokensRepository from '@modules/auth/repositories/IRefreshTokensRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'

import AppError from '@shared/errors/AppError'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  accessToken: string
  refreshToken: string
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const normalizedEmail = email.trim().toLowerCase()
    const user = await this.usersRepository.findByEmail(normalizedEmail)

    if (!user) {
      throw new AppError('User does not exists', 400)
    }

    if (!(await this.hashProvider.compareHash(password, user.password_hash))) {
      throw new AppError('Incorrect Password/email validate', 401)
    }

    const accessToken = sign({}, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.accessTokenExpiresIn,
    })

    const refreshTokenValue = crypto.randomBytes(40).toString('hex')
    const hashedRefreshToken = crypto.createHash('sha256').update(refreshTokenValue).digest('hex')

    await this.refreshTokensRepository.create({
      user_id: user.id,
      hashedToken: hashedRefreshToken,
    })

    return {
      user,
      accessToken,
      refreshToken: refreshTokenValue,
    }
  }
}

export default AuthenticateUserService
