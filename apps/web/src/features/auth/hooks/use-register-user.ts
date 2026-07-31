import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../services/auth-service';

export function useRegisterUser() {
  return useMutation({
    mutationFn: registerUser,
  });
}
