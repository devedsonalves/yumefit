import { container } from 'tsyringe'

import '@modules/users/providers'
import '@shared/container/providers'

import IUserRepository from '@modules/users/repositories/ICreateUsersRepository'
import UsersRepository from '@modules/users/infrastructure/typeorm/repositories/UsersRepository'

import RefreshTokensRepository from '@modules/auth/infrastructure/typeorm/repositories/RefreshTokensRepository'
import IRefreshTokensRepository from '@modules/auth/repositories/IRefreshTokensRepository'
import AuthActionTokensRepository from '@modules/auth/infrastructure/typeorm/repositories/AuthActionTokensRepository'
import IAuthActionTokensRepository from '@modules/auth/repositories/IAuthActionTokensRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import ConsoleMailProvider from '@shared/container/providers/MailProvider/implementations/ConsoleMailProvider'

container.registerSingleton<IUserRepository>('UsersRepository', UsersRepository)

container.registerSingleton<IRefreshTokensRepository>(
  'RefreshTokensRepository',
  RefreshTokensRepository,
)

container.registerSingleton<IAuthActionTokensRepository>(
  'AuthActionTokensRepository',
  AuthActionTokensRepository,
)

container.registerSingleton<IMailProvider>('MailProvider', ConsoleMailProvider)
