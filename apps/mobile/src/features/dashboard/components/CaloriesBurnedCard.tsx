import { View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Flame } from 'lucide-react-native'
import { Typography } from '@/shared/components/ui/Typography'
import { Card } from '@/shared/components/ui/Card'
import { useTranslation } from '@/shared/i18n/LanguageProvider'
import { useAppTheme } from '@/shared/theme/ThemeProvider'

interface CaloriesBurnedCardProps {
  current: number
  goal: number
}

export const CaloriesBurnedCard = ({ current, goal }: CaloriesBurnedCardProps) => {
  const { theme: colors } = useAppTheme()
  const styles = useStyles(colors)

  const { t } = useTranslation()
  const percentage = Math.min((current / goal) * 100, 100)

  return (
    <Card variant="glass" style={styles.metricsCard}>
      <View style={styles.row}>
        <View style={styles.caloriesText}>
          <View style={styles.iconBox}>
            <Flame color={colors.primary} size={24} />
          </View>
          <Typography variant="h3" bold style={styles.mt}>
            {t('dashboard.calories')}
          </Typography>
          <Typography variant="caption" style={styles.description}>
            {t('dashboard.calories_desc')}
          </Typography>
        </View>
        <View style={styles.chartCircle}>
          <View style={styles.progressInner}>
            <Typography variant="h2" bold>
              {current.toLocaleString()}
            </Typography>
            <Typography variant="label" color="textMuted">
              cal
            </Typography>
          </View>
          <View style={[styles.progressHalf, { transform: [{ rotate: '45deg' }] }]} />
        </View>
      </View>

      <View style={styles.progressBarBg}>
        <LinearGradient
          colors={[colors.primary, colors.primaryLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressBarFill, { width: `${percentage}%` }]}
        />
      </View>
      <View style={styles.rowBetween}>
        <Typography variant="caption">
          {t('dashboard.goal')}: {goal.toLocaleString()} cal
        </Typography>
        <Typography variant="caption" color="primary">
          🔥 {t('dashboard.calories')}
        </Typography>
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
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    caloriesText: { flex: 1, paddingRight: 16 },
    iconBox: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: 'rgba(255, 122, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    mt: { marginTop: 16 },
    description: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
    chartCircle: {
      width: 140,
      height: 140,
      borderRadius: 70,
      borderWidth: 10,
      borderColor: colors.surfaceLight,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    progressInner: { alignItems: 'center' },
    progressHalf: {
      position: 'absolute',
      width: 140,
      height: 140,
      borderRadius: 70,
      borderWidth: 10,
      borderColor: colors.primary,
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
    },
    progressBarBg: {
      height: 8,
      backgroundColor: colors.surfaceLight,
      borderRadius: 4,
      marginVertical: 16,
      overflow: 'hidden',
    },
    progressBarFill: { height: '100%', borderRadius: 4 },
  })
