import RefreshToken from '../infrastructure/typeorm/entities/RefreshToken'

export interface ICreateRefreshTokenDTO {
  user_id: string
  hashedToken: string
}

export default interface IRefreshTokensRepository {
  create(data: ICreateRefreshTokenDTO): Promise<RefreshToken>
  findByToken(token: string): Promise<RefreshToken | undefined>
  findById(id: string): Promise<RefreshToken | undefined>
  findActiveByUserId(user_id: string): Promise<RefreshToken[]>
  invalidateToken(token: string): Promise<void>
  invalidateById(id: string): Promise<void>
  invalidateByUserId(user_id: string): Promise<void>
  deleteByUserId(user_id: string): Promise<void>
}
