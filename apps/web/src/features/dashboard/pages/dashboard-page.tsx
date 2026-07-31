import { ShieldCheck, UserRound, UsersRound } from 'lucide-react';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { PageState } from '@/shared/components/feedback/page-state';
import { formatDateTime } from '@/shared/lib/format-date';

export function DashboardPage() {
  const currentUserQuery = useCurrentUser();
  const user = currentUserQuery.data?.user;

  if (!user) {
    return <PageState title="Carregando painel" description="Sincronizando seu perfil." />;
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-medium text-primary">Operacao web</p>
        <h2 className="text-3xl font-bold">Bem-vindo, {user.name}</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-md border bg-card p-5 shadow-sm">
          <UserRound aria-hidden="true" className="h-5 w-5 text-primary" />
          <h3 className="mt-4 font-semibold">Perfil autenticado</h3>
          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
        </article>
        <article className="rounded-md border bg-card p-5 shadow-sm">
          <ShieldCheck aria-hidden="true" className="h-5 w-5 text-primary" />
          <h3 className="mt-4 font-semibold">Permissao</h3>
          <p className="mt-1 text-sm text-muted-foreground">{user.role === 'admin' ? 'Administrador' : 'Usuario padrao'}</p>
        </article>
        <article className="rounded-md border bg-card p-5 shadow-sm">
          <UsersRound aria-hidden="true" className="h-5 w-5 text-primary" />
          <h3 className="mt-4 font-semibold">Criado em</h3>
          <p className="mt-1 text-sm text-muted-foreground">{formatDateTime(user.created_at)}</p>
        </article>
      </div>

      {!user.email_verified_at ? (
        <PageState
          title="Email ainda nao verificado"
          description="A API permite solicitar um token de verificacao pela tela Minha conta."
        />
      ) : null}
    </section>
  );
}
