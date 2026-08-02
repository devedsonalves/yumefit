import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../services/auth-service';
import type { LoginFormData } from '../schemas/login-schema';
import { authQueryKeys } from './auth-query-keys';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ termsAccepted: _termsAccepted, ...credentials }: LoginFormData) => login(credentials),
    onSuccess: ({ user }) => {
      queryClient.setQueryData(authQueryKeys.currentUser, { user });
    },
  });
}
