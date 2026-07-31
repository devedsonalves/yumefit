import 'reflect-metadata'

import { injectable, inject } from 'tsyringe'

import IUserRepository from '@modules/users/repositories/ICreateUsersRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

import User from '@modules/users/infrastructure/typeorm/entities/User'
import IRefreshTokensRepository from '@modules/auth/repositories/IRefreshTokensRepository'
import { isUserRole, UserRole } from '@modules/users/types/UserRole'
import AppError from '@shared/errors/AppError'

interface IRequest {
  user_id: string
  requester_id: string
  requester_role: UserRole
  name: string
  email: string
  password?: string
  role?: UserRole
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,
  ) {}

  public async execute({
    user_id,
    requester_id,
    requester_role,
    name,
    email,
    password,
    role,
  }: IRequest): Promise<User> {
    if (role && requester_role !== 'admin') {
      throw new AppError('Only administrators can update user roles.', 403)
    }

    if (role && !isUserRole(role)) {
      throw new AppError('Invalid user role.', 400)
    }

    if (password && password.length < 8) {
      throw new AppError('Password must contain at least 8 characters.', 400)
    }

    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const canUpdate = requester_id === user_id || requester_role === 'admin'

    if (!canUpdate) {
      throw new AppError('User is not allowed to update this profile.', 403)
    }

    const normalizedEmail = email.trim().toLowerCase()
    const userWithUpdatedEmail = await this.usersRepository.findByEmail(normalizedEmail)

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('Email already in use.')
    }

    user.name = name
    user.email = normalizedEmail

    if (role) {
      user.role = role
    }

    if (password) {
      user.password_hash = await this.hashProvider.generateHash(password)
    }

    await this.usersRepository.save(user)

    if (password) {
      await this.refreshTokensRepository.invalidateByUserId(user_id)
    }

    await this.cacheProvider.invalidate('users-list')

    return user
  }
}

export default UpdateUserService
