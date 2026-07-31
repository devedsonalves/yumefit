import type { LoginFormData } from '@/features/auth/schemas/login-schema';
import type { AuthUser } from '@/features/auth/types/auth';
import { httpClient } from '@/shared/services/http/http-client';

type LoginResponse = {
  user: AuthUser;
  accessToken?: string;
  refreshToken?: string;
};

type MeResponse = {
  user: AuthUser;
};

export function login(credentials: LoginFormData) {
  return httpClient<LoginResponse>('/auth/login', {
    method: 'POST',
    body: credentials,
  });
}

export function getCurrentUser() {
  return httpClient<MeResponse>('/auth/me');
}

export function logout() {
  return httpClient<void>('/auth/logout', {
    method: 'POST',
  });
}
