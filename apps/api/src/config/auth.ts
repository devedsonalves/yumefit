import { SECRET, EXPIRES_IN } from '@shared/utils/environment'

interface IAuthConfig {
  secret: string
  expires_in: string
  accessTokenName: string
  refreshTokenName: string
}

export default {
  secret: SECRET || 'default-secret',
  expires_in: EXPIRES_IN || '1d',
  accessTokenName: 'access_token',
  refreshTokenName: 'refresh_token',
} as IAuthConfig
