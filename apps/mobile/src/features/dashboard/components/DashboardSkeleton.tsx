import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Skeleton } from '@/shared/components/ui/Skeleton'
import { spacing, radius } from '@/shared/theme'
import { useAppTheme } from '@/shared/theme/ThemeProvider'

export const DashboardSkeleton = () => {
  const { theme: colors } = useAppTheme();
  const styles = useStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Skeleton height={200} borderRadius={radius.lg} style={styles.mb} />
        <Skeleton height={180} borderRadius={radius.lg} style={styles.mb} />
        <Skeleton height={150} borderRadius={radius.lg} style={styles.mb} />
        <View style={styles.row}>
          <Skeleton height={100} borderRadius={radius.lg} style={styles.flex} />
          <Skeleton height={100} borderRadius={radius.lg} style={styles.flex} />
        </View>
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
  row: { flexDirection: 'row', gap: spacing.md },
  flex: { flex: 1 },
})
