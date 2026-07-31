import { useQueryClient } from '@tanstack/react-query';
import { MonitorX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageState } from '@/shared/components/feedback/page-state';
import { Button } from '@/shared/components/ui/button';
import { formatDateTime } from '@/shared/lib/format-date';
import { authQueryKeys } from '../hooks/auth-query-keys';
import { useLogoutAllSessions, useRevokeSession, useSessions } from '../hooks/use-sessions';

export function SessionsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const sessionsQuery = useSessions();
  const revokeSessionMutation = useRevokeSession();
  const logoutAllMutation = useLogoutAllSessions();

  async function handleLogoutAll() {
    await logoutAllMutation.mutateAsync();
    queryClient.removeQueries({ queryKey: authQueryKeys.currentUser });
    navigate('/login', { replace: true });
  }

  if (sessionsQuery.isLoading) {
    return <PageState title="Carregando sessoes" description="Consultando sessoes ativas na API." />;
  }

  if (sessionsQuery.isError) {
    return (
      <PageState
        title="Nao foi possivel carregar sessoes"
        description="Tente novamente ou faca login de novo."
        action={{ label: 'Tentar novamente', onClick: () => void sessionsQuery.refetch() }}
      />
    );
  }

  const sessions = sessionsQuery.data?.sessions ?? [];

  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Seguranca</p>
          <h2 className="text-3xl font-bold">Sessoes ativas</h2>
        </div>
        <Button type="button" variant="outline" disabled={logoutAllMutation.isPending || sessions.length === 0} onClick={handleLogoutAll}>
          <MonitorX aria-hidden="true" className="h-4 w-4" />
          Encerrar todas
        </Button>
      </div>

      {sessions.length === 0 ? <PageState title="Nenhuma sessao ativa" description="A API nao retornou sessoes para este usuario." /> : null}

      {sessions.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2">
          {sessions.map((session) => (
            <article key={session.id} className="rounded-md border bg-card p-4 shadow-sm">
              <p className="break-all text-sm font-semibold">{session.id}</p>
              <dl className="mt-4 grid gap-2 text-sm">
                <div>
                  <dt className="text-muted-foreground">Criada em</dt>
                  <dd>{formatDateTime(session.created_at)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Atualizada em</dt>
                  <dd>{formatDateTime(session.updated_at)}</dd>
                </div>
              </dl>
              <Button
                className="mt-4"
                type="button"
                variant="outline"
                size="sm"
                disabled={revokeSessionMutation.isPending}
                onClick={() => revokeSessionMutation.mutate(session.id)}
              >
                Revogar
              </Button>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
