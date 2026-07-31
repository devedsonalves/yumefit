import { StyleSheet, Text, View } from 'react-native';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { Screen } from '@/shared/components/layout/screen';
import { colors, spacing } from '@/shared/theme/tokens';

export function ProfilePage() {
  const { data } = useCurrentUser();

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>{data?.user.name}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{data?.user.email}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  value: {
    color: colors.text,
    fontSize: 17,
    marginBottom: spacing.md,
  },
});
