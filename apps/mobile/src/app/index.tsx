import { Redirect } from 'expo-router';
import { PageState } from '@/shared/components/feedback/page-state';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { routes } from '@/app/routes';

export default function IndexRoute() {
  const { data, isLoading } = useCurrentUser();

  if (isLoading) {
    return <PageState title="Carregando" description="Validando sua sessao." />;
  }

  return <Redirect href={data?.user ? routes.home : routes.login} />;
}
