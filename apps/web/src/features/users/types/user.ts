export type UserRole = 'admin' | 'user';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  auth_provider: string;
  created_at: string;
  email_verified_at?: string | null;
};

export type UpdateUserInput = {
  id: string;
  name: string;
  email: string;
  password?: string;
  role?: UserRole;
};
