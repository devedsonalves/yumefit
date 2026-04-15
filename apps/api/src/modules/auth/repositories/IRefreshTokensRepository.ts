import RefreshToken from '../infrastructure/typeorm/entities/RefreshToken'

export interface ICreateRefreshTokenDTO {
  user_id: string
  hashedToken: string
}

export default interface IRefreshTokensRepository {
  create(data: ICreateRefreshTokenDTO): Promise<RefreshToken>
  findByToken(token: string): Promise<RefreshToken | undefined>
  invalidateToken(token: string): Promise<void>
  deleteByUserId(user_id: string): Promise<void>
}
