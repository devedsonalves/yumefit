import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(2, 'Informe o nome.'),
  email: z.string().email('Informe um email valido.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.').optional().or(z.literal('')),
  role: z.enum(['admin', 'user']).optional(),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
