import { secureStorage } from '@/shared/storage/secure-storage';

const accessTokenKey = 'auth.accessToken';
const refreshTokenKey = 'auth.refreshToken';

export type AuthTokenPair = {
  accessToken: string;
  refreshToken: string;
};

export async function getAccessToken() {
  return secureStorage.getItem(accessTokenKey);
}

export async function saveAuthTokens(tokens: AuthTokenPair) {
  await Promise.all([
    secureStorage.setItem(accessTokenKey, tokens.accessToken),
    secureStorage.setItem(refreshTokenKey, tokens.refreshToken),
  ]);
}

export async function clearAuthTokens() {
  await Promise.all([secureStorage.removeItem(accessTokenKey), secureStorage.removeItem(refreshTokenKey)]);
}
