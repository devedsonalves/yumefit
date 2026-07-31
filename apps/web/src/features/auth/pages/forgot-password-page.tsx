import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { PageState } from '@/shared/components/feedback/page-state';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useRequestPasswordReset } from '../hooks/use-password-reset';
import { requestPasswordResetSchema, type RequestPasswordResetFormData } from '../schemas/password-reset-schema';

export function ForgotPasswordPage() {
  const mutation = useRequestPasswordReset();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<RequestPasswordResetFormData>({
    resolver: zodResolver(requestPasswordResetSchema),
    defaultValues: {
      email: '',
    },
  });

  if (mutation.isSuccess) {
    return (
      <main className="grid min-h-screen place-items-center px-4 py-10">
        <PageState title="Solicitacao enviada" description="Se o email existir, a API enviara as instrucoes de redefinicao.">
          <Link className="text-sm font-semibold text-primary hover:underline" to="/reset-password">
            Tenho um token de redefinicao
          </Link>
        </PageState>
      </main>
    );
  }

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <section className="w-full max-w-md rounded-md border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Recuperar senha</h1>
        <p className="mt-2 text-sm text-muted-foreground">Informe seu email para solicitar um token de redefinicao.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit((data) => mutation.mutate(data))}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <Input id="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} {...register('email')} />
            {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
          </div>

          {mutation.isError ? <p className="text-sm text-destructive">Nao foi possivel solicitar a redefinicao.</p> : null}

          <Button className="w-full" type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Enviando...' : 'Solicitar token'}
          </Button>
        </form>
      </section>
    </main>
  );
}
