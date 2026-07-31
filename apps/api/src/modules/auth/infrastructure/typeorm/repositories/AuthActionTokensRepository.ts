import { getRepository, IsNull, MoreThan, Repository } from 'typeorm'

import AuthActionToken, {
  AuthActionTokenType,
} from '@modules/auth/infrastructure/typeorm/entities/AuthActionToken'
import IAuthActionTokensRepository, {
  ICreateAuthActionTokenDTO,
} from '@modules/auth/repositories/IAuthActionTokensRepository'

class AuthActionTokensRepository implements IAuthActionTokensRepository {
  private ormRepository: Repository<AuthActionToken>

  constructor() {
    this.ormRepository = getRepository(AuthActionToken)
  }

  public async create(data: ICreateAuthActionTokenDTO): Promise<AuthActionToken> {
    return this.ormRepository.save(this.ormRepository.create(data))
  }

  public async findValidByToken(
    hashedToken: string,
    type: AuthActionTokenType,
  ): Promise<AuthActionToken | undefined> {
    return this.ormRepository.findOne({
      where: {
        hashedToken,
        type,
        used_at: IsNull(),
        expires_at: MoreThan(new Date()),
      },
    })
  }

  public async invalidateByUserId(user_id: string, type: AuthActionTokenType): Promise<void> {
    await this.ormRepository.update({ user_id, type, used_at: IsNull() }, { used_at: new Date() })
  }

  public async markAsUsed(id: string): Promise<void> {
    await this.ormRepository.update(id, { used_at: new Date() })
  }
}

export default AuthActionTokensRepository
