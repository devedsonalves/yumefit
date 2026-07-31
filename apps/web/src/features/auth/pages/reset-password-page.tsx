import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useResetPassword } from '../hooks/use-password-reset';
import { resetPasswordSchema, type ResetPasswordFormData } from '../schemas/password-reset-schema';

export function ResetPasswordPage() {
  const mutation = useResetPassword();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: '',
      password: '',
    },
  });

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <section className="w-full max-w-md rounded-md border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Definir nova senha</h1>
        <p className="mt-2 text-sm text-muted-foreground">Use o token recebido para trocar sua senha.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit((data) => mutation.mutate(data))}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="token">
              Token
            </label>
            <Input id="token" aria-invalid={Boolean(errors.token)} {...register('token')} />
            {errors.token ? <p className="text-sm text-destructive">{errors.token.message}</p> : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Nova senha
            </label>
            <Input id="password" type="password" autoComplete="new-password" aria-invalid={Boolean(errors.password)} {...register('password')} />
            {errors.password ? <p className="text-sm text-destructive">{errors.password.message}</p> : null}
          </div>

          {mutation.isError ? <p className="text-sm text-destructive">Token invalido ou expirado.</p> : null}
          {mutation.isSuccess ? (
            <p className="text-sm text-primary">
              Senha alterada. <Link to="/login" className="font-semibold hover:underline">Entrar agora</Link>
            </p>
          ) : null}

          <Button className="w-full" type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Alterando...' : 'Alterar senha'}
          </Button>
        </form>
      </section>
    </main>
  );
}
