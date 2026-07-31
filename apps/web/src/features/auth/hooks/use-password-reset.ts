import { useMutation } from '@tanstack/react-query';
import { requestPasswordReset, resetPassword } from '../services/auth-service';

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: requestPasswordReset,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}
