import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'
import AuthenticateUserService from '@modules/auth/services/AuthenticateUserService'
import RefreshTokenService from '@modules/auth/services/RefreshTokenService'
import LogoutService from '@modules/auth/services/LogoutService'
import ChangePasswordService from '@modules/auth/services/ChangePasswordService'
import RequestPasswordResetService from '@modules/auth/services/RequestPasswordResetService'
import ResetPasswordService from '@modules/auth/services/ResetPasswordService'
import RequestEmailVerificationService from '@modules/auth/services/RequestEmailVerificationService'
import VerifyEmailService from '@modules/auth/services/VerifyEmailService'
import ListSessionsService from '@modules/auth/services/ListSessionsService'
import RevokeSessionService from '@modules/auth/services/RevokeSessionService'
import LogoutAllSessionsService from '@modules/auth/services/LogoutAllSessionsService'
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
    const logout = container.resolve(LogoutService)

    await logout.execute({
      refreshToken: req.cookies[authConfig.refreshTokenName],
    })

    clearAuthCookies(res)
    return res.status(204).send()
  }

  public async changePassword(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(ChangePasswordService)
    await service.execute({ user_id: req.user.id, ...req.body })
    clearAuthCookies(res)
    return res.status(204).send()
  }

  public async requestPasswordReset(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(RequestPasswordResetService)
    await service.execute({ email: req.body.email })
    return res.status(204).send()
  }

  public async resetPassword(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(ResetPasswordService)
    await service.execute(req.body)
    return res.status(204).send()
  }

  public async requestEmailVerification(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(RequestEmailVerificationService)
    await service.execute({ user_id: req.user.id })
    return res.status(204).send()
  }

  public async verifyEmail(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(VerifyEmailService)
    await service.execute({ token: req.body.token })
    return res.status(204).send()
  }

  public async sessions(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(ListSessionsService)
    return res.json({ sessions: await service.execute({ user_id: req.user.id }) })
  }

  public async revokeSession(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(RevokeSessionService)
    await service.execute({ user_id: req.user.id, session_id: req.params.id })
    return res.status(204).send()
  }

  public async logoutAll(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(LogoutAllSessionsService)
    await service.execute({ user_id: req.user.id })
    clearAuthCookies(res)
    return res.status(204).send()
  }
}
