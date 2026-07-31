import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { routes } from '@/app/routes';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { useLogout } from '@/features/auth/hooks/use-logout';
import { Screen } from '@/shared/components/layout/screen';
import { Button } from '@/shared/components/ui/button';
import { colors, radius, spacing } from '@/shared/theme/tokens';

export function HomePage() {
  const { data } = useCurrentUser();
  const logout = useLogout();

  return (
    <Screen>
      <View style={styles.container}>
        <View>
          <Text style={styles.eyebrow}>Inicio</Text>
          <Text style={styles.title}>Ola, {data?.user.name ?? 'aluno'}</Text>
          <Text style={styles.subtitle}>Resumo mobile pronto para receber os dados de treino e progresso.</Text>
        </View>

        <View style={styles.grid}>
          <Link href={routes.workouts} style={styles.card}>
            <Text style={styles.cardTitle}>Treinos</Text>
            <Text style={styles.cardText}>Planejamento e historico.</Text>
          </Link>
          <Link href={routes.progress} style={styles.card}>
            <Text style={styles.cardTitle}>Progresso</Text>
            <Text style={styles.cardText}>Medidas e evolucao.</Text>
          </Link>
          <Link href={routes.profile} style={styles.card}>
            <Text style={styles.cardTitle}>Perfil</Text>
            <Text style={styles.cardText}>Dados da conta.</Text>
          </Link>
        </View>

        <Button label="Sair" loading={logout.isPending} onPress={() => logout.mutate()} variant="secondary" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '800',
    marginTop: spacing.xs,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 23,
    marginTop: spacing.sm,
  },
  grid: {
    gap: spacing.md,
  },
  card: {
    minHeight: 104,
    justifyContent: 'center',
    gap: spacing.xs,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  cardText: {
    color: colors.textMuted,
    fontSize: 14,
  },
});
