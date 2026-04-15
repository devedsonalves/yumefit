import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Skeleton } from '@/shared/components/ui/Skeleton'
import { spacing, colors, radius } from '@/shared/theme'

export const WorkoutSkeleton = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Skeleton height={180} borderRadius={radius.lg} style={styles.mb} />
        <View style={styles.row}>
          <Skeleton height={100} borderRadius={radius.lg} style={styles.flex} />
          <Skeleton height={100} borderRadius={radius.lg} style={styles.flex} />
        </View>
        <Skeleton height={40} width={120} style={styles.mb} />
        <Skeleton height={200} borderRadius={radius.lg} style={styles.mb} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 20 },
  content: {
    padding: spacing.md,
    paddingTop: 80,
  },
  mb: { marginBottom: spacing.xl },
  row: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xl },
  flex: { flex: 1 },
})
