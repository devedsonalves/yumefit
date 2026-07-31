import { Trash2 } from 'lucide-react';
import { PageState } from '@/shared/components/feedback/page-state';
import { Button } from '@/shared/components/ui/button';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { formatDateTime } from '@/shared/lib/format-date';
import { useDeleteUser, useUsers } from '../hooks/use-users';

const roleLabel = {
  admin: 'Administrador',
  user: 'Usuario',
};

export function UsersPage() {
  const currentUserQuery = useCurrentUser();
  const currentUser = currentUserQuery.data?.user;
  const isAdmin = currentUser?.role === 'admin';
  const usersQuery = useUsers(isAdmin);
  const deleteUserMutation = useDeleteUser();

  if (!isAdmin) {
    return (
      <PageState
        title="Sem permissao"
        description="A listagem de usuarios e restrita a administradores pela API."
      />
    );
  }

  if (usersQuery.isLoading) {
    return <PageState title="Carregando usuarios" description="Consultando /users na API." />;
  }

  if (usersQuery.isError) {
    return (
      <PageState
        title="Nao foi possivel carregar usuarios"
        description="Verifique se a API esta ativa e se sua sessao ainda e valida."
        action={{ label: 'Tentar novamente', onClick: () => void usersQuery.refetch() }}
      />
    );
  }

  if (!usersQuery.data?.length) {
    return <PageState title="Nenhum usuario encontrado" description="Crie usuarios pela tela de cadastro." />;
  }

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-medium text-primary">Administracao</p>
        <h2 className="text-3xl font-bold">Usuarios</h2>
      </div>

      <div className="overflow-hidden rounded-md border bg-card shadow-sm">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Nome</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Perfil</th>
              <th className="px-4 py-3 font-semibold">Criado em</th>
              <th className="px-4 py-3 text-right font-semibold">Acoes</th>
            </tr>
          </thead>
          <tbody>
            {usersQuery.data.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                <td className="px-4 py-3">{roleLabel[user.role]}</td>
                <td className="px-4 py-3">{formatDateTime(user.created_at)}</td>
                <td className="px-4 py-3 text-right">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={deleteUserMutation.isPending || user.id === currentUser?.id}
                    onClick={() => deleteUserMutation.mutate(user.id)}
                    aria-label={`Excluir ${user.name}`}
                  >
                    <Trash2 aria-hidden="true" className="h-4 w-4" />
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
