import { Redirect, Stack } from 'expo-router';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { PageState } from '@/shared/components/feedback/page-state';
import { routes } from '@/app/routes';

export default function AuthLayout() {
  const { data, isLoading } = useCurrentUser();

  if (isLoading) {
    return <PageState title="Carregando" description="Validando sua sessao." />;
  }

  if (data?.user) {
    return <Redirect href={routes.home} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
