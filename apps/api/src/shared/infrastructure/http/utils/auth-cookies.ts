import { Response } from 'express'
import authConfig from '@config/auth'

interface SetAuthCookiesOptions {
  accessToken: string
  refreshToken: string
}

/**
 * Sets access and refresh tokens in HTTP-only cookies.
 * 
 * @param res - Express Response object
 * @param tokens - Object containing accessToken and refreshToken strings
 */
export function setAuthCookies(res: Response, { accessToken, refreshToken }: SetAuthCookiesOptions): void {
  const isProduction = process.env.NODE_ENV === 'production'

  res.cookie(authConfig.accessTokenName, accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 1000 * 60 * 15, // 15 minutes
  })

  res.cookie(authConfig.refreshTokenName, refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  })
}

export function clearAuthCookies(res: Response): void {
  res.clearCookie(authConfig.accessTokenName, { path: '/' })
  res.clearCookie(authConfig.refreshTokenName, { path: '/' })
}
