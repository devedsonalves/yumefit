import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '@config/auth'

import AppError from '@shared/errors/AppError'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

function EnsureAuthentication(request: Request, response: Response, next: NextFunction) {
  let token = request.cookies[authConfig.accessTokenName]

  if (!token) {
    const authHeader = request.headers.authorization

    if (authHeader) {
      const parts = authHeader.split(' ')
      if (parts.length === 2) {
        token = parts[1]
      }
    }
  }

  if (!token) {
    throw new AppError('JWT token is missing.', 401)
  }

  try {
    const decoded = verify(token, authConfig.secret)

    const { sub } = decoded as ITokenPayload

    request.user = {
      id: sub,
    }

    return next()
  } catch (err) {
    throw new AppError('Invalid JWT token', 401)
  }
}

export default EnsureAuthentication
