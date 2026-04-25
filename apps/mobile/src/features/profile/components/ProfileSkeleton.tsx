import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Skeleton } from '@/shared/components/ui/Skeleton'
import { spacing, radius } from '@/shared/theme'
import { useAppTheme } from '@/shared/theme/ThemeProvider'

export const ProfileSkeleton = () => {
  const { theme: colors } = useAppTheme();
  const styles = useStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Skeleton height={80} width={80} borderRadius={40} />
          <View style={styles.headerInfo}>
            <Skeleton height={24} width={150} style={styles.mbSm} />
            <Skeleton height={16} width={100} />
          </View>
        </View>
        <Skeleton height={100} borderRadius={radius.lg} style={styles.mb} />
        <Skeleton height={30} width={120} style={styles.mb} />
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
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xl },
  headerInfo: { marginLeft: spacing.lg },
  mbSm: { marginBottom: 8 },
  mb: { marginBottom: spacing.xl },
})
