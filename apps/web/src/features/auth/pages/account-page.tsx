import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { MailCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import { PageState } from '@/shared/components/feedback/page-state';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useUpdateUser } from '@/features/users/hooks/use-users';
import { updateUserSchema, type UpdateUserFormData } from '@/features/users/schemas/user-schema';
import { formatDateTime } from '@/shared/lib/format-date';
import { authQueryKeys } from '../hooks/auth-query-keys';
import { useChangePassword } from '../hooks/use-change-password';
import { useCurrentUser } from '../hooks/use-current-user';
import { useRequestEmailVerification } from '../hooks/use-email-verification';
import { changePasswordSchema, type ChangePasswordFormData } from '../schemas/change-password-schema';

export function AccountPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentUserQuery = useCurrentUser();
  const changePasswordMutation = useChangePassword();
  const verificationMutation = useRequestEmailVerification();
  const updateUserMutation = useUpdateUser();
  const user = currentUserQuery.data?.user;
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });
  const {
    formState: { errors: profileErrors },
    handleSubmit: handleProfileSubmit,
    register: registerProfile,
    reset: resetProfile,
  } = useReactHookForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: undefined,
    },
  });

  useEffect(() => {
    if (user) {
      resetProfile({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
      });
    }
  }, [resetProfile, user]);

  async function handleChangePassword(data: ChangePasswordFormData) {
    await changePasswordMutation.mutateAsync(data);
    reset();
    queryClient.removeQueries({ queryKey: authQueryKeys.currentUser });
    navigate('/login', { replace: true });
  }

  async function handleUpdateProfile(data: UpdateUserFormData) {
    if (!user) return;

    await updateUserMutation.mutateAsync({
      id: user.id,
      name: data.name,
      email: data.email,
      password: data.password || undefined,
    });
  }

  if (!user) {
    return <PageState title="Carregando conta" description="Sincronizando seu perfil." />;
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[1fr_28rem]">
      <div className="space-y-5">
        <div>
          <p className="text-sm font-medium text-primary">Minha conta</p>
          <h2 className="text-3xl font-bold">{user.name}</h2>
        </div>

        <article className="rounded-md border bg-card p-5 shadow-sm">
          <h3 className="font-semibold">Dados do usuario</h3>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">Email</dt>
              <dd className="font-medium">{user.email}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Perfil</dt>
              <dd className="font-medium">{user.role === 'admin' ? 'Administrador' : 'Usuario padrao'}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Origem</dt>
              <dd className="font-medium">{user.auth_provider}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Criado em</dt>
              <dd className="font-medium">{formatDateTime(user.created_at)}</dd>
            </div>
          </dl>
        </article>

        <article className="rounded-md border bg-card p-5 shadow-sm">
          <h3 className="font-semibold">Editar perfil</h3>
          <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={handleProfileSubmit(handleUpdateProfile)}>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="profileName">
                Nome
              </label>
              <Input id="profileName" aria-invalid={Boolean(profileErrors.name)} {...registerProfile('name')} />
              {profileErrors.name ? <p className="text-sm text-destructive">{profileErrors.name.message}</p> : null}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="profileEmail">
                Email
              </label>
              <Input id="profileEmail" type="email" aria-invalid={Boolean(profileErrors.email)} {...registerProfile('email')} />
              {profileErrors.email ? <p className="text-sm text-destructive">{profileErrors.email.message}</p> : null}
            </div>

            {updateUserMutation.isError ? <p className="text-sm text-destructive sm:col-span-2">Nao foi possivel atualizar o perfil.</p> : null}
            {updateUserMutation.isSuccess ? <p className="text-sm text-primary sm:col-span-2">Perfil atualizado.</p> : null}

            <div className="sm:col-span-2">
              <Button type="submit" disabled={updateUserMutation.isPending}>
                {updateUserMutation.isPending ? 'Salvando...' : 'Salvar perfil'}
              </Button>
            </div>
          </form>
        </article>

        <article className="rounded-md border bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold">Verificacao de email</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {user.email_verified_at
                  ? `Verificado em ${formatDateTime(user.email_verified_at)}`
                  : 'Solicite um token de verificacao pela API.'}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              disabled={Boolean(user.email_verified_at) || verificationMutation.isPending}
              onClick={() => verificationMutation.mutate()}
            >
              <MailCheck aria-hidden="true" className="h-4 w-4" />
              {verificationMutation.isPending ? 'Solicitando...' : 'Solicitar token'}
            </Button>
          </div>
          {verificationMutation.isSuccess ? <p className="mt-3 text-sm text-primary">Solicitacao enviada.</p> : null}
          {verificationMutation.isError ? <p className="mt-3 text-sm text-destructive">Nao foi possivel solicitar verificacao.</p> : null}
        </article>
      </div>

      <aside className="rounded-md border bg-card p-5 shadow-sm">
        <h3 className="font-semibold">Alterar senha</h3>
        <p className="mt-1 text-sm text-muted-foreground">A API encerra a sessao apos uma troca de senha bem-sucedida.</p>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit(handleChangePassword)}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="currentPassword">
              Senha atual
            </label>
            <Input
              id="currentPassword"
              type="password"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.currentPassword)}
              {...register('currentPassword')}
            />
            {errors.currentPassword ? <p className="text-sm text-destructive">{errors.currentPassword.message}</p> : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="newPassword">
              Nova senha
            </label>
            <Input
              id="newPassword"
              type="password"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.newPassword)}
              {...register('newPassword')}
            />
            {errors.newPassword ? <p className="text-sm text-destructive">{errors.newPassword.message}</p> : null}
          </div>

          {changePasswordMutation.isError ? <p className="text-sm text-destructive">Nao foi possivel alterar a senha.</p> : null}

          <Button className="w-full" type="submit" disabled={changePasswordMutation.isPending}>
            {changePasswordMutation.isPending ? 'Alterando...' : 'Alterar senha'}
          </Button>
        </form>
      </aside>
    </section>
  );
}
