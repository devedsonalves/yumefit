import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { routes } from '@/app/routes';
import { logout } from '@/features/auth/services/auth-service';
import { clearAuthTokens } from '@/features/auth/storage/auth-token-storage';
import { queryClient } from '@/shared/services/query/query-client';

export function useLogout() {
  return useMutation({
    mutationFn: logout,
    onSettled: async () => {
      await clearAuthTokens();
      queryClient.clear();
      router.replace(routes.login);
    },
  });
}
