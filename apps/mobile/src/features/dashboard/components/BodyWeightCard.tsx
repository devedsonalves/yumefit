import { View, StyleSheet } from 'react-native'
import { colors } from '@/shared/theme'
import { Typography } from '@/shared/components/ui/Typography'
import { Card } from '@/shared/components/ui/Card'
import { useTranslation } from '@/shared/i18n'

interface BodyWeightCardProps {
  currentWeight: number
  startWeight: number
  period: string
}

export const BodyWeightCard = ({ currentWeight, startWeight, period }: BodyWeightCardProps) => {
  const { t } = useTranslation()

  return (
    <Card variant="glass" style={styles.metricsCard}>
      <View style={styles.rowBetween}>
        <Typography variant="h3" bold>
          {t('dashboard.body_weight')}
        </Typography>
        <Typography variant="caption" color="textMuted">
          {period}
        </Typography>
      </View>
      <View style={styles.weightChart}>
        <View style={styles.weightLine} />
        <View style={styles.weightPoint} />
      </View>
      <View style={styles.rowBetween}>
        <Typography variant="h2" bold>
          {currentWeight}kg
        </Typography>
        <Typography variant="caption">
          {t('dashboard.start')}: {startWeight}kg
        </Typography>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  metricsCard: { marginBottom: 16, padding: 24 },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  weightChart: { height: 100, justifyContent: 'center', marginVertical: 16 },
  weightLine: { height: 2, backgroundColor: colors.surfaceLight },
  weightPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    position: 'absolute',
    right: 40,
  },
})
