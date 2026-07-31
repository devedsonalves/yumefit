import AuthActionToken, {
  AuthActionTokenType,
} from '@modules/auth/infrastructure/typeorm/entities/AuthActionToken'

export interface ICreateAuthActionTokenDTO {
  user_id: string
  hashedToken: string
  type: AuthActionTokenType
  expires_at: Date
}

export default interface IAuthActionTokensRepository {
  create(data: ICreateAuthActionTokenDTO): Promise<AuthActionToken>
  findValidByToken(hashedToken: string, type: AuthActionTokenType): Promise<AuthActionToken | undefined>
  invalidateByUserId(user_id: string, type: AuthActionTokenType): Promise<void>
  markAsUsed(id: string): Promise<void>
}
