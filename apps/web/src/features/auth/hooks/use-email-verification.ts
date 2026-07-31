import { useMutation } from '@tanstack/react-query';
import { requestEmailVerification } from '../services/auth-service';

export function useRequestEmailVerification() {
  return useMutation({
    mutationFn: requestEmailVerification,
  });
}
