import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import AuthController from '../controllers/AuthController'
import ensureAuthentication from '@modules/users/infrastructure/http/middlewares/EnsureAuthentication'

const authRouter = Router()
const authController = new AuthController()

/**
 * @openapi
 * /auth/me:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Show current user profile
 *     description: Returns the data of the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data.
 *       401:
 *         description: Not authenticated.
 */
authRouter.get('/me', ensureAuthentication, authController.me)

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Authenticate a user
 *     description: Returns a user object and sets access and refresh tokens in secure cookies.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Invalid credentials.
 */
authRouter.post(
  '/login',
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().trim().lowercase().email().required(),
        password: Joi.string().min(8).required(),
      }),
    },
    { abortEarly: false },
  ),
  authController.login,
)

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Refresh tokens
 *     description: Uses the refresh token cookie to generate new access and refresh tokens.
 *     responses:
 *       204:
 *         description: Tokens refreshed successfully.
 *       401:
 *         description: Invalid or missing refresh token.
 */
authRouter.post('/refresh', authController.refresh)

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Logout user
 *     description: Clears authentication cookies.
 *     responses:
 *       204:
 *         description: Logged out successfully.
 */
authRouter.post('/logout', authController.logout)

authRouter.put(
  '/password',
  ensureAuthentication,
  celebrate({
    [Segments.BODY]: {
      currentPassword: Joi.string().required(),
      newPassword: Joi.string().min(8).required(),
    },
  }),
  authController.changePassword,
)

authRouter.post(
  '/password-reset/request',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().trim().lowercase().email().required(),
    },
  }),
  authController.requestPasswordReset,
)

authRouter.post(
  '/password-reset/confirm',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
      password: Joi.string().min(8).required(),
    },
  }),
  authController.resetPassword,
)

authRouter.post(
  '/email-verification/request',
  ensureAuthentication,
  authController.requestEmailVerification,
)

authRouter.post(
  '/email-verification/confirm',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
    },
  }),
  authController.verifyEmail,
)

authRouter.get('/sessions', ensureAuthentication, authController.sessions)

authRouter.delete(
  '/sessions/:id',
  ensureAuthentication,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  authController.revokeSession,
)

authRouter.post('/logout-all', ensureAuthentication, authController.logoutAll)

export default authRouter
