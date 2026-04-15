import { container } from 'tsyringe'

import '@modules/users/providers'
import '@shared/container/providers'

import IUserRepository from '@modules/users/repositories/ICreateUsersRepository'
import UsersRepository from '@modules/users/infrastructure/typeorm/repositories/UsersRepository'

import RefreshTokensRepository from '@modules/auth/infrastructure/typeorm/repositories/RefreshTokensRepository'
import IRefreshTokensRepository from '@modules/auth/repositories/IRefreshTokensRepository'

container.registerSingleton<IUserRepository>('UsersRepository', UsersRepository)

container.registerSingleton<IRefreshTokensRepository>(
  'RefreshTokensRepository',
  RefreshTokensRepository,
)
