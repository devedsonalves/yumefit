import 'reflect-metadata'

import { inject, injectable } from 'tsyringe'

import IRefreshTokensRepository from '@modules/auth/repositories/IRefreshTokensRepository'
import AppError from '@shared/errors/AppError'

@injectable()
class RevokeSessionService {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,
  ) {}

  public async execute({ user_id, session_id }: { user_id: string; session_id: string }) {
    const session = await this.refreshTokensRepository.findById(session_id)

    if (!session || session.user_id !== user_id) throw new AppError('Session not found.', 404)

    await this.refreshTokensRepository.invalidateById(session_id)
  }
}

export default RevokeSessionService
