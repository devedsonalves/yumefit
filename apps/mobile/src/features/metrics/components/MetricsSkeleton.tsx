import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Skeleton } from '@/shared/components/ui/Skeleton'
import { spacing, radius } from '@/shared/theme'
import { useAppTheme } from '@/shared/theme/ThemeProvider'

export const MetricsSkeleton = () => {
  const { theme: colors } = useAppTheme();
  const styles = useStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.rowBetween}>
          <Skeleton height={30} width={150} />
          <Skeleton height={30} width={100} borderRadius={10} />
        </View>
        <View style={styles.row}>
          <Skeleton height={100} borderRadius={radius.lg} style={styles.flex} />
          <Skeleton height={100} borderRadius={radius.lg} style={styles.flex} />
        </View>
        <Skeleton height={30} width={180} style={styles.mb} />
        <Skeleton height={80} borderRadius={radius.lg} style={styles.mb} />
        <Skeleton height={30} width={180} style={styles.mb} />
        <Skeleton height={200} borderRadius={radius.lg} style={styles.mb} />
      </View>
    </SafeAreaView>
  )
}

const useStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 20 },
  content: {
    padding: spacing.md,
    paddingTop: 80,
  },
  mb: { marginBottom: spacing.md },
  row: { flexDirection: 'row', gap: spacing.md, marginVertical: spacing.lg },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  flex: { flex: 1 },
})
