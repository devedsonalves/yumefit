import { Redirect, Stack } from 'expo-router';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { PageState } from '@/shared/components/feedback/page-state';
import { routes } from '@/app/routes';

export default function ProtectedLayout() {
  const { data, isLoading } = useCurrentUser();

  if (isLoading) {
    return <PageState title="Carregando" description="Validando sua sessao." />;
  }

  if (!data?.user) {
    return <Redirect href={routes.login} />;
  }

  return (
    <Stack>
      <Stack.Screen name="home" options={{ title: 'Yume Fit' }} />
      <Stack.Screen name="profile" options={{ title: 'Perfil' }} />
      <Stack.Screen name="workouts" options={{ title: 'Treinos' }} />
      <Stack.Screen name="progress" options={{ title: 'Progresso' }} />
    </Stack>
  );
}
