import { getRepository, Repository } from 'typeorm'
import IRefreshTokensRepository, {
  ICreateRefreshTokenDTO,
} from '@modules/auth/repositories/IRefreshTokensRepository'
import RefreshToken from '../entities/RefreshToken'

class RefreshTokensRepository implements IRefreshTokensRepository {
  private ormRepository: Repository<RefreshToken>

  constructor() {
    this.ormRepository = getRepository(RefreshToken)
  }

  public async create({ user_id, hashedToken }: ICreateRefreshTokenDTO): Promise<RefreshToken> {
    const refreshToken = this.ormRepository.create({
      user_id,
      hashedToken,
    })

    await this.ormRepository.save(refreshToken)

    return refreshToken
  }

  public async findByToken(token: string): Promise<RefreshToken | undefined> {
    const refreshToken = await this.ormRepository.findOne({
      where: { hashedToken: token },
    })

    return refreshToken
  }

  public async invalidateToken(token: string): Promise<void> {
    const refreshToken = await this.ormRepository.findOne({
      where: { hashedToken: token },
    })

    if (refreshToken) {
      refreshToken.revoked = true
      await this.ormRepository.save(refreshToken)
    }
  }

  public async deleteByUserId(user_id: string): Promise<void> {
    await this.ormRepository.delete({ user_id })
  }
}

export default RefreshTokensRepository
