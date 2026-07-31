import { httpClient } from '@/shared/services/http/http-client';
import type { UpdateUserInput, User } from '../types/user';

export function listUsers() {
  return httpClient<User[]>('/users');
}

export function showUser(userId: string) {
  return httpClient<User>(`/users/${userId}`);
}

export function updateUser({ id, ...data }: UpdateUserInput) {
  return httpClient<User>(`/users/${id}`, {
    method: 'PUT',
    body: {
      ...data,
      password: data.password || undefined,
    },
  });
}

export function deleteUser(userId: string) {
  return httpClient<void>(`/users/${userId}`, {
    method: 'DELETE',
  });
}
