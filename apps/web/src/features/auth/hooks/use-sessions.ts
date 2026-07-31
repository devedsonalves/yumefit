import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { listSessions, logoutAllSessions, revokeSession } from '../services/auth-service';
import { authQueryKeys } from './auth-query-keys';

export function useSessions() {
  return useQuery({
    queryKey: authQueryKeys.sessions,
    queryFn: listSessions,
  });
}

export function useRevokeSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: revokeSession,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: authQueryKeys.sessions });
    },
  });
}

export function useLogoutAllSessions() {
  return useMutation({
    mutationFn: logoutAllSessions,
  });
}
