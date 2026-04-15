import { ScrollView, StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, spacing } from '@/shared/theme'
import { Typography } from '@/shared/components/ui/Typography'
import { Card } from '@/shared/components/ui/Card'
import { TodayWorkoutCard } from '../components/TodayWorkoutCard'
import { WorkoutHistoryItem } from '../components/WorkoutHistoryItem'
import { ExerciseStatCard } from '../../dashboard/components/ExerciseStatCard'
import { WorkoutSkeleton } from '../components/WorkoutSkeleton'
import { useWorkoutOverview } from '../hooks/useWorkoutOverview'
import { useTranslation } from '@/shared/i18n'

export const WorkoutMode = () => {
  const { data, isLoading } = useWorkoutOverview()
  const { t } = useTranslation()

  if (isLoading) {
    return <WorkoutSkeleton />
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <TodayWorkoutCard
          routine={data.today.routine}
          exercises={data.today.exercises}
          duration={data.today.duration}
          intensity={data.today.intensity}
          onPress={() => {}}
        />

        <View style={styles.rowGrid}>
          {data.weeklyStats.map((stat, index) => (
            <ExerciseStatCard
              key={index}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
            />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Typography variant="h3" bold>
            {t('workout_overview.history')}
          </Typography>
          <TouchableOpacity>
            <Typography variant="label" color="primary">
              {t('workout_overview.view_all')}
            </Typography>
          </TouchableOpacity>
        </View>

        <Card variant="glass" style={styles.historyCard}>
          {data.history.map((item) => (
            <WorkoutHistoryItem
              key={item.id}
              routine={item.routine}
              date={item.date}
              duration={item.duration}
            />
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 20 },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xs,
  },
  scrollContent: {
    padding: spacing.md,
    paddingTop: 80,
    paddingBottom: 120,
  },
  rowGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  historyCard: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
})
