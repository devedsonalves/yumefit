import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'
import AuthenticateUserService from '@modules/auth/services/AuthenticateUserService'
import RefreshTokenService from '@modules/auth/services/RefreshTokenService'
import ShowProfileService from '@modules/users/services/ShowProfileService'
import { setAuthCookies, clearAuthCookies } from '@shared/infrastructure/http/utils/auth-cookies'
import authConfig from '@config/auth'

export default class AuthController {
  public async me(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id

    const showProfile = container.resolve(ShowProfileService)

    const user = await showProfile.execute({ user_id })

    return res.json({ user: classToClass(user) })
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const authenticateUser = container.resolve(AuthenticateUserService)

    const { user, accessToken, refreshToken } = await authenticateUser.execute({
      email,
      password,
    })

    setAuthCookies(res, { accessToken, refreshToken })

    return res.json({ user: classToClass(user) })
  }

  public async refresh(req: Request, res: Response): Promise<Response> {
    const refreshToken = req.cookies[authConfig.refreshTokenName]

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token missing' })
    }

    const refreshTokenService = container.resolve(RefreshTokenService)

    const { accessToken, refreshToken: newRefreshToken } = await refreshTokenService.execute({
      refreshToken,
    })

    setAuthCookies(res, { accessToken, refreshToken: newRefreshToken })

    return res.status(204).send()
  }

  public async logout(req: Request, res: Response): Promise<Response> {
    clearAuthCookies(res)
    return res.status(204).send()
  }
}
