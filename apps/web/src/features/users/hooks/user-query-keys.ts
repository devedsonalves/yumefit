export const userQueryKeys = {
  all: ['users'] as const,
  lists: () => [...userQueryKeys.all, 'list'] as const,
  detail: (userId: string) => [...userQueryKeys.all, 'detail', userId] as const,
};
