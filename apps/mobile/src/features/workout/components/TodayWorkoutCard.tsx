import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Play } from 'lucide-react-native'
import { spacing, radius } from '@/shared/theme'
import { Typography } from '@/shared/components/ui/Typography'
import { Card } from '@/shared/components/ui/Card'
import { useTranslation } from '@/shared/i18n/LanguageProvider'
import { useAppTheme } from '@/shared/theme/ThemeProvider'

interface TodayWorkoutCardProps {
  routine: string
  exercises: number
  duration: number
  intensity: string
  onPress: () => void
}

export const TodayWorkoutCard = ({
  routine,
  exercises,
  duration,
  intensity,
  onPress,
}: TodayWorkoutCardProps) => {
  const { theme: colors } = useAppTheme()
  const styles = useStyles(colors)

  const { t } = useTranslation()

  return (
    <Card variant="glass" style={styles.container}>
      <View style={styles.header}>
        <View>
          <Typography variant="label" color="primary" bold style={styles.uppercase}>
            {t('workout_overview.today_routine')}
          </Typography>
          <Typography variant="h2" bold style={styles.title}>
            {routine}
          </Typography>
        </View>
        <TouchableOpacity style={styles.playButton} onPress={onPress}>
          <Play color={colors.background} size={24} fill={colors.background} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Typography variant="h3" bold>
            {exercises}
          </Typography>
          <Typography variant="caption" color="textMuted">
            {t('workout_overview.exercises')}
          </Typography>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Typography variant="h3" bold>
            {duration}m
          </Typography>
          <Typography variant="caption" color="textMuted">
            {t('workout_overview.duration')}
          </Typography>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Typography variant="h3" bold>
            {intensity}
          </Typography>
          <Typography variant="caption" color="textMuted">
            {t('workout_overview.intensity')}
          </Typography>
        </View>
      </View>
    </Card>
  )
}

const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginBottom: spacing.lg,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.xl,
    },
    title: {
      marginTop: 4,
    },
    playButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    statsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
    },
    divider: {
      width: 1,
      height: 30,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    uppercase: {
      textTransform: 'uppercase',
    },
  })
