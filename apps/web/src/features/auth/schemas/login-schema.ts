import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Informe seu e-mail.').email('Informe um e-mail válido.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
  termsAccepted: z.boolean().refine(Boolean, 'Aceite os termos para continuar.'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
