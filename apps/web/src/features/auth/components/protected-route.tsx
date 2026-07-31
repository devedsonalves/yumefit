import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { PageState } from '@/shared/components/feedback/page-state';
import { useCurrentUser } from '../hooks/use-current-user';

export function ProtectedRoute() {
  const location = useLocation();
  const currentUserQuery = useCurrentUser();

  if (currentUserQuery.isLoading) {
    return (
      <main className="grid min-h-screen place-items-center px-4">
        <PageState title="Validando acesso" description="Conferindo sua sessao com a API do Yume Fit." />
      </main>
    );
  }

  if (currentUserQuery.isError) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
