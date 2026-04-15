import { Router } from 'express'

import rateLimiter from '@shared/infrastructure/http/middlewares/rateLimiter'

import usersRouter from '@modules/users/infrastructure/http/routes/user.routes'
import authRouter from '@modules/auth/infrastructure/http/routes/auth.routes'

const routes = Router()

routes.use(rateLimiter)

routes.use('/users', usersRouter)
routes.use('/auth', authRouter)

export default routes
