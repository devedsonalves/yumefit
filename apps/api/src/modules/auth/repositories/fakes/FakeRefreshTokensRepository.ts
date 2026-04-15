import { v4 as uuid } from 'uuid'

import RefreshToken from '@modules/auth/infrastructure/typeorm/entities/RefreshToken'
import IRefreshTokensRepository, {
  ICreateRefreshTokenDTO,
} from '@modules/auth/repositories/IRefreshTokensRepository'

class FakeRefreshTokensRepository implements IRefreshTokensRepository {
  private refreshTokens: RefreshToken[] = []

  public async create({ user_id, hashedToken }: ICreateRefreshTokenDTO): Promise<RefreshToken> {
    const refreshToken = new RefreshToken()

    Object.assign(refreshToken, {
      id: uuid(),
      user_id,
      hashedToken,
      revoked: false,
      created_at: new Date(),
      updated_at: new Date(),
    })

    this.refreshTokens.push(refreshToken)

    return refreshToken
  }

  public async findByToken(token: string): Promise<RefreshToken | undefined> {
    const refreshToken = this.refreshTokens.find((rt) => rt.hashedToken === token)

    return refreshToken
  }

  public async invalidateToken(token: string): Promise<void> {
    const refreshToken = this.refreshTokens.find((rt) => rt.hashedToken === token)

    if (refreshToken) {
      refreshToken.revoked = true
    }
  }

  public async deleteByUserId(user_id: string): Promise<void> {
    this.refreshTokens = this.refreshTokens.filter((rt) => rt.user_id !== user_id)
  }
}

export default FakeRefreshTokensRepository
