import { SECRET, EXPIRES_IN, NODE_ENV } from '@shared/utils/environment'

interface IAuthConfig {
  secret: string
  expires_in: string
  accessTokenExpiresIn: string
  accessTokenMaxAge: number
  refreshTokenMaxAge: number
  passwordResetTokenMaxAge: number
  emailVerificationTokenMaxAge: number
  accessTokenName: string
  refreshTokenName: string
}

const developmentSecret = 'development-only-secret'
const insecureProductionSecrets = [developmentSecret, 'change-me-in-production', 'default-secret']

if (NODE_ENV === 'production' && (!SECRET || insecureProductionSecrets.includes(SECRET))) {
  throw new Error('SECRET must be configured with a secure value in production.')
}

export default {
  secret: SECRET || developmentSecret,
  expires_in: EXPIRES_IN || '1d',
  accessTokenExpiresIn: '15m',
  accessTokenMaxAge: 1000 * 60 * 15,
  refreshTokenMaxAge: 1000 * 60 * 60 * 24 * 7,
  passwordResetTokenMaxAge: 1000 * 60 * 60,
  emailVerificationTokenMaxAge: 1000 * 60 * 60 * 24,
  accessTokenName: 'access_token',
  refreshTokenName: 'refresh_token',
} as IAuthConfig
