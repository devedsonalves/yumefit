import { zodResolver } from '@hookform/resolvers/zod';
import { Activity } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { registerSchema, type RegisterFormData } from '../schemas/register-schema';
import { useRegisterUser } from '../hooks/use-register-user';

export function RegisterPage() {
  const navigate = useNavigate();
  const registerMutation = useRegisterUser();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function handleRegister(data: RegisterFormData) {
    await registerMutation.mutateAsync(data);
    navigate('/login', { replace: true });
  }

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <section className="w-full max-w-md rounded-md border bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-md bg-primary text-primary-foreground">
            <Activity aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Yume Fit</p>
            <h1 className="text-2xl font-bold">Criar usuario</h1>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">
              Nome
            </label>
            <Input id="name" autoComplete="name" aria-invalid={Boolean(errors.name)} {...register('name')} />
            {errors.name ? <p className="text-sm text-destructive">{errors.name.message}</p> : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <Input id="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} {...register('email')} />
            {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Senha
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.password)}
              {...register('password')}
            />
            {errors.password ? <p className="text-sm text-destructive">{errors.password.message}</p> : null}
          </div>

          {registerMutation.isError ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              Nao foi possivel criar o usuario. Verifique os dados e tente novamente.
            </p>
          ) : null}

          <Button className="w-full" type="submit" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? 'Criando...' : 'Criar usuario'}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Ja tem acesso?{' '}
          <Link className="font-semibold text-primary hover:underline" to="/login">
            Entrar
          </Link>
        </p>
      </section>
    </main>
  );
}
