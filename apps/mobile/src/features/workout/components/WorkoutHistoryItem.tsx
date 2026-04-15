import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { ChevronRight, Clock } from 'lucide-react-native'
import { colors, spacing } from '@/shared/theme'
import { Typography } from '@/shared/components/ui/Typography'

interface WorkoutHistoryItemProps {
  routine: string
  date: string
  duration: string
  onPress?: () => void
}

export const WorkoutHistoryItem = ({
  routine,
  date,
  duration,
  onPress,
}: WorkoutHistoryItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconBox}>
        <Clock color={colors.primary} size={20} />
      </View>
      <View style={styles.content}>
        <Typography variant="body" bold>
          {routine}
        </Typography>
        <Typography variant="caption" color="textMuted">
          {date} • {duration}
        </Typography>
      </View>
      <ChevronRight color={colors.textMuted} size={20} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 122, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
})
