import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '../hooks/use-current-user';

export function GuestRoute() {
  const currentUserQuery = useCurrentUser();

  if (currentUserQuery.isSuccess) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
