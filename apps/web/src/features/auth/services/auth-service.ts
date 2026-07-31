import { httpClient } from '@/shared/services/http/http-client'
import type { ChangePasswordFormData } from '../schemas/change-password-schema'
import type { LoginFormData } from '../schemas/login-schema'
import type { RegisterFormData } from '../schemas/register-schema'
import type {
  RequestPasswordResetFormData,
  ResetPasswordFormData,
} from '../schemas/password-reset-schema'
import type { AuthSession, AuthUser } from '../types/auth'

type LoginResponse = {
  user: AuthUser
}

type MeResponse = {
  user: AuthUser
}

type SessionsResponse = {
  sessions: AuthSession[]
}

export function login(credentials: LoginFormData) {
  return httpClient<LoginResponse>('/auth/login', {
    method: 'POST',
    body: credentials,
  })
}

export function registerUser(data: RegisterFormData) {
  return httpClient<AuthUser>('/users', {
    method: 'POST',
    body: data,
  })
}

export function getCurrentUser() {
  return httpClient<MeResponse>('/auth/me')
}

export function logout() {
  return httpClient<void>('/auth/logout', {
    method: 'POST',
  })
}

export function requestPasswordReset(data: RequestPasswordResetFormData) {
  return httpClient<void>('/auth/password-reset/request', {
    method: 'POST',
    body: data,
  })
}

export function resetPassword(data: ResetPasswordFormData) {
  return httpClient<void>('/auth/password-reset/confirm', {
    method: 'POST',
    body: data,
  })
}

export function changePassword(data: ChangePasswordFormData) {
  return httpClient<void>('/auth/password', {
    method: 'PUT',
    body: data,
  })
}

export function requestEmailVerification() {
  return httpClient<void>('/auth/email-verification/request', {
    method: 'POST',
  })
}

export function listSessions() {
  return httpClient<SessionsResponse>('/auth/sessions')
}

export function revokeSession(sessionId: string) {
  return httpClient<void>(`/auth/sessions/${sessionId}`, {
    method: 'DELETE',
  })
}

export function logoutAllSessions() {
  return httpClient<void>('/auth/logout-all', {
    method: 'POST',
  })
}
