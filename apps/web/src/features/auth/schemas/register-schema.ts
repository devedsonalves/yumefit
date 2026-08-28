import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, 'Informe seu nome completo.'),
    email: z.string().trim().min(1, 'Informe seu e-mail.').email('Informe um e-mail válido.'),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
    confirmPassword: z.string().min(1, 'Confirme sua senha.'),
    termsAccepted: z.boolean().refine(Boolean, 'Aceite os termos para continuar.'),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
