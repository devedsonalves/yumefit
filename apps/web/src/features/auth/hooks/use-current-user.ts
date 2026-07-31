import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/auth-service';
import { authQueryKeys } from './auth-query-keys';

export function useCurrentUser() {
  return useQuery({
    queryKey: authQueryKeys.currentUser,
    queryFn: getCurrentUser,
    retry: false,
  });
}
