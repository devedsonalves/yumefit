import { useQuery } from '@tanstack/react-query';
import { authQueryKeys } from './auth-query-keys';
import { getCurrentUser } from '@/features/auth/services/auth-service';

export function useCurrentUser() {
  return useQuery({
    queryKey: authQueryKeys.currentUser,
    queryFn: getCurrentUser,
    retry: false,
  });
}
