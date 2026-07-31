import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../services/auth-service';
import { authQueryKeys } from './auth-query-keys';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(authQueryKeys.currentUser, { user });
    },
  });
}
