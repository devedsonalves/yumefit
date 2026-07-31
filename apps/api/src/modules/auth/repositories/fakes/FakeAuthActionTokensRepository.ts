import { v4 as uuid } from 'uuid'

import AuthActionToken, {
  AuthActionTokenType,
} from '@modules/auth/infrastructure/typeorm/entities/AuthActionToken'
import IAuthActionTokensRepository, {
  ICreateAuthActionTokenDTO,
} from '@modules/auth/repositories/IAuthActionTokensRepository'

class FakeAuthActionTokensRepository implements IAuthActionTokensRepository {
  private tokens: AuthActionToken[] = []

  public async create(data: ICreateAuthActionTokenDTO): Promise<AuthActionToken> {
    const token = new AuthActionToken()
    Object.assign(token, { id: uuid(), created_at: new Date(), ...data })
    this.tokens.push(token)
    return token
  }

  public async findValidByToken(
    hashedToken: string,
    type: AuthActionTokenType,
  ): Promise<AuthActionToken | undefined> {
    return this.tokens.find(
      (token) =>
        token.hashedToken === hashedToken &&
        token.type === type &&
        !token.used_at &&
        token.expires_at.getTime() > Date.now(),
    )
  }

  public async invalidateByUserId(user_id: string, type: AuthActionTokenType): Promise<void> {
    this.tokens
      .filter((token) => token.user_id === user_id && token.type === type && !token.used_at)
      .forEach((token) => {
        token.used_at = new Date()
      })
  }

  public async markAsUsed(id: string): Promise<void> {
    const token = this.tokens.find((item) => item.id === id)
    if (token) token.used_at = new Date()
  }
}

export default FakeAuthActionTokensRepository
