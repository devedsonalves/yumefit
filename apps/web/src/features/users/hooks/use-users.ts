import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authQueryKeys } from '@/features/auth/hooks/auth-query-keys';
import { deleteUser, listUsers, showUser, updateUser } from '../services/user-service';
import type { UpdateUserInput } from '../types/user';
import { userQueryKeys } from './user-query-keys';

export function useUsers(enabled: boolean) {
  return useQuery({
    queryKey: userQueryKeys.lists(),
    queryFn: listUsers,
    enabled,
  });
}

export function useUser(userId: string) {
  return useQuery({
    queryKey: userQueryKeys.detail(userId),
    queryFn: () => showUser(userId),
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateUserInput) => updateUser(input),
    onSuccess: (user) => {
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
      void queryClient.invalidateQueries({ queryKey: authQueryKeys.currentUser });
      queryClient.setQueryData(userQueryKeys.detail(user.id), user);
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
  });
}
