import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../services/auth-service';
import type { RegisterFormData } from '../schemas/register-schema';

export function useRegisterUser() {
  return useMutation({
    mutationFn: ({ confirmPassword: _confirmPassword, termsAccepted: _termsAccepted, ...user }: RegisterFormData) =>
      registerUser(user),
  });
}
