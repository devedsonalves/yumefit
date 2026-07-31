import 'reflect-metadata'

import { inject, injectable } from 'tsyringe'

import IRefreshTokensRepository from '@modules/auth/repositories/IRefreshTokensRepository'

@injectable()
class ListSessionsService {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,
  ) {}

  public async execute({ user_id }: { user_id: string }) {
    const sessions = await this.refreshTokensRepository.findActiveByUserId(user_id)

    return sessions.map(({ id, created_at, updated_at }) => ({ id, created_at, updated_at }))
  }
}

export default ListSessionsService
