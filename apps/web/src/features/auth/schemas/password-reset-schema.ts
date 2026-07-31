import { z } from 'zod';

export const requestPasswordResetSchema = z.object({
  email: z.string().email('Informe um email valido.'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Informe o token recebido.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
});

export type RequestPasswordResetFormData = z.infer<typeof requestPasswordResetSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
