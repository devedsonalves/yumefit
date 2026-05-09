import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Typography } from '@/shared/components/ui/Typography'
import { Card } from '@/shared/components/ui/Card'
import { useAppTheme } from '@/shared/theme/ThemeProvider'

interface NextExerciseItemProps {
  name: string
  details: string
}

export const NextExerciseItem = ({ name, details }: NextExerciseItemProps) => {
  const { theme: colors } = useAppTheme();
  const styles = useStyles(colors);

  return (
    <Card style={styles.exerciseItem}>
      <View>
        <Typography bold>{name}</Typography>
        <Typography variant="caption">{details}</Typography>
      </View>
      <Typography variant="h3">➡️</Typography>
    </Card>
  )
}

const useStyles = (colors: any) => StyleSheet.create({
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
  },
})
