import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/shared/components/layout/screen';
import { colors, spacing } from '@/shared/theme/tokens';

export function ProgressPage() {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Progresso</Text>
        <Text style={styles.text}>Feature pronta para metricas, fotos de evolucao e resolucao explicita de conflitos.</Text>
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
  },
  text: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 23,
  },
});
