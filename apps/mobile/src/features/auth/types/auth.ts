export type AuthUserRole = 'admin' | 'user';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: AuthUserRole;
  auth_provider: string;
  created_at: string;
  email_verified_at?: string | null;
};

export type AuthSession = {
  id: string;
  created_at: string;
  updated_at: string;
};
