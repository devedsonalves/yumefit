import { useMutation } from '@tanstack/react-query';
import { login } from '@/features/auth/services/auth-service';
import { saveAuthTokens } from '@/features/auth/storage/auth-token-storage';
import { queryClient } from '@/shared/services/query/query-client';
import { authQueryKeys } from './auth-query-keys';

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      if (data.accessToken && data.refreshToken) {
        await saveAuthTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
      }

      queryClient.setQueryData(authQueryKeys.currentUser, { user: data.user });
    },
  });
}
