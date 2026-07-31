import { LayoutDashboard, LogOut, Shield, UserRound, UsersRound } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { authQueryKeys } from '@/features/auth/hooks/auth-query-keys';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { useLogout } from '@/features/auth/hooks/use-logout';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

const navigationItems = [
  { to: '/dashboard', label: 'Painel', icon: LayoutDashboard },
  { to: '/users', label: 'Usuarios', icon: UsersRound, adminOnly: true },
  { to: '/sessions', label: 'Sessoes', icon: Shield },
  { to: '/account', label: 'Conta', icon: UserRound },
];

export function AppLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentUserQuery = useCurrentUser();
  const logoutMutation = useLogout();
  const currentUser = currentUserQuery.data?.user;

  async function handleLogout() {
    await logoutMutation.mutateAsync();
    queryClient.removeQueries({ queryKey: authQueryKeys.currentUser });
    navigate('/login', { replace: true });
  }

  return (
    <div className="min-h-screen">
      <header className="border-b bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Yume Fit</p>
            <h1 className="text-xl font-bold">Console operacional</h1>
          </div>
          <nav aria-label="Principal" className="flex items-center gap-2">
            {navigationItems.filter((item) => !item.adminOnly || currentUser?.role === 'admin').map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
                    )
                  }
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
          <Button type="button" variant="outline" disabled={logoutMutation.isPending} onClick={handleLogout}>
            <LogOut aria-hidden="true" className="h-4 w-4" />
            {logoutMutation.isPending ? 'Saindo...' : 'Sair'}
          </Button>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
