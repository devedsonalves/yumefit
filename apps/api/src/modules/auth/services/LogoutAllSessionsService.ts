import 'reflect-metadata'

import { inject, injectable } from 'tsyringe'

import IRefreshTokensRepository from '@modules/auth/repositories/IRefreshTokensRepository'

@injectable()
class LogoutAllSessionsService {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,
  ) {}

  public async execute({ user_id }: { user_id: string }) {
    await this.refreshTokensRepository.invalidateByUserId(user_id)
  }
}

export default LogoutAllSessionsService
