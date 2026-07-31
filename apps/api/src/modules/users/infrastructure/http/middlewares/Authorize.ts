import { NextFunction, Request, Response } from 'express'

import { UserRole } from '@modules/users/types/UserRole'
import AppError from '@shared/errors/AppError'

export function allowRoles(...roles: UserRole[]) {
  return (request: Request, _: Response, next: NextFunction) => {
    if (!roles.includes(request.user.role)) {
      throw new AppError('User is not allowed to perform this action.', 403)
    }

    return next()
  }
}

export function allowSelfOrRoles(...roles: UserRole[]) {
  return (request: Request, _: Response, next: NextFunction) => {
    if (request.user.id !== request.params.id && !roles.includes(request.user.role)) {
      throw new AppError('User is not allowed to perform this action.', 403)
    }

    return next()
  }
}
