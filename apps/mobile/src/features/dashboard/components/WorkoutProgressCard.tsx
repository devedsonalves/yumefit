import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Typography } from '@/shared/components/ui/Typography'
import { Card } from '@/shared/components/ui/Card'
import { useTranslation } from '@/shared/i18n/LanguageProvider'
import { useAppTheme } from '@/shared/theme/ThemeProvider'

interface WorkoutProgressCardProps {
  completed: number
  total: number
  chartData: number[]
}

export const WorkoutProgressCard = ({ completed, total, chartData }: WorkoutProgressCardProps) => {
  const { theme: colors } = useAppTheme()
  const styles = useStyles(colors)

  const { t } = useTranslation()
  return (
    <Card variant="glass" style={styles.metricsCard}>
      <Typography variant="h3" bold>
        {t('dashboard.workout_progress')}
      </Typography>
      <View style={styles.row}>
        <View>
          <Typography variant="h1" color="primary" bold>
            {completed}/{total}
          </Typography>
          <Typography variant="label">{t('dashboard.completed')} </Typography>
          <Typography variant="label">{t('dashboard.this_week')}</Typography>
        </View>
        <View style={styles.barChart}>
          {chartData.map((h, i) => (
            <View key={i} style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  {
                    height: h,
                    backgroundColor: i === 5 ? colors.primary : colors.surfaceLight,
                  },
                ]}
              />
              <Typography variant="label" style={styles.barLabel}>
                {11 + i}
              </Typography>
            </View>
          ))}
        </View>
      </View>
    </Card>
  )
}

const useStyles = (colors: any) =>
  StyleSheet.create({
    metricsCard: { marginBottom: 16, padding: 24 },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    barChart: { flexDirection: 'row', alignItems: 'flex-end', gap: 6 },
    barContainer: { alignItems: 'center' },
    bar: { width: 12, borderRadius: 6 },
    barLabel: { fontSize: 8, marginTop: 4 },
  })
