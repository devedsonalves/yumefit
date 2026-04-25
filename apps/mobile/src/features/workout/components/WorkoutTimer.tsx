import React from 'react'
import { View, StyleSheet } from 'react-native'
import { spacing } from '@/shared/theme'
import { Typography } from '@/shared/components/ui/Typography'
import { useAppTheme } from '@/shared/theme/ThemeProvider'

interface WorkoutTimerProps {
  time: string
  label: string
}

export const WorkoutTimer = ({ time, label }: WorkoutTimerProps) => {
  const { theme: colors } = useAppTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.timerContainer}>
      <View style={styles.progressCircle}>
        <Typography variant="h1" bold color="primary">
          {time}
        </Typography>
        <Typography variant="label">{label}</Typography>
      </View>
    </View>
  )
}

const useStyles = (colors: any) => StyleSheet.create({
  timerContainer: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  progressCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 4,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
})
