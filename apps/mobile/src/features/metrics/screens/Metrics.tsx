import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { spacing } from '@/shared/theme'
import { Typography } from '@/shared/components/ui/Typography'
import { Card } from '@/shared/components/ui/Card'
import { BarChart3, TrendingUp, Calendar } from 'lucide-react-native'
import { useTranslation } from '@/shared/i18n/LanguageProvider'
import { MetricsSkeleton } from '../components/MetricsSkeleton'
import React, { useState, useEffect } from 'react'
import { useAppTheme } from '@/shared/theme/ThemeProvider'

const StatItem = ({ label, value, subtext, icon: Icon, color }: any) => {
  const { theme: colors } = useAppTheme()
  const styles = useStyles(colors)

  return (
    <Card variant="glass" style={styles.statCard}>
      <View style={styles.row}>
        <View style={[styles.iconBox, { backgroundColor: `${color}15` }]}>
          <Icon color={color} size={20} />
        </View>
        <View style={styles.statInfo}>
          <Typography variant="caption" color="textMuted">
            {label}
          </Typography>
          <Typography variant="h3" bold>
            {value}
          </Typography>
          <Typography variant="label" style={{ color }}>
            {subtext}
          </Typography>
        </View>
      </View>
    </Card>
  )
}

export const Metrics = () => {
  const { theme: colors } = useAppTheme()
  const styles = useStyles(colors)

  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <MetricsSkeleton />
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Typography variant="h2" bold>
            {t('metrics.title')}
          </Typography>
          <View style={styles.periodSelector}>
            <Calendar color={colors.textMuted} size={16} />
            <Typography variant="caption" style={styles.ml}>
              {t('metrics.period')}
            </Typography>
          </View>
        </View>

        <View style={styles.grid}>
          <StatItem
            label={t('metrics.volume')}
            value="42.5 tons"
            subtext={`+12% ${t('metrics.vs_last_month')}`}
            icon={TrendingUp}
            color={colors.primary}
          />
          <StatItem
            label={t('metrics.duration')}
            value="18.4 hrs"
            subtext={`+1.2 hrs ${t('metrics.vs_last_month')}`}
            icon={BarChart3}
            color={colors.success}
          />
        </View>

        <Typography variant="h3" bold style={styles.sectionTitle}>
          {t('metrics.pr')}
        </Typography>

        <Card variant="glass" style={styles.prCard}>
          <View style={styles.rowBetween}>
            <View>
              <Typography bold>Back Squat</Typography>
              <Typography variant="caption">Nov 12, 2023</Typography>
            </View>
            <View style={styles.prBadge}>
              <Typography bold color="primary">
                140 kg
              </Typography>
            </View>
          </View>
        </Card>

        <Typography variant="h3" bold style={styles.sectionTitle}>
          {t('metrics.evolution')}
        </Typography>
        <Card variant="glass" style={styles.chartPlaceholder}>
          <View style={styles.fakeChart}>
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <View
                key={i}
                style={[
                  styles.chartBar,
                  {
                    height: h,
                    backgroundColor: i === 5 ? colors.primary : colors.surfaceLight,
                  },
                ]}
              />
            ))}
          </View>
          <View style={styles.rowBetween}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <Typography key={i} variant="label" color="textMuted">
                {d}
              </Typography>
            ))}
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}

const useStyles = (colors: any) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, paddingTop: 20 },
    scrollContent: {
      padding: spacing.md,
      paddingTop: 80,
      paddingBottom: 120,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.lg,
      paddingHorizontal: spacing.xs,
    },
    periodSelector: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    ml: { marginLeft: 4 },
    grid: {
      flexDirection: 'row',
      gap: spacing.md,
      marginBottom: spacing.lg,
    },
    statCard: {
      flex: 1,
    },
    statInfo: {
      marginLeft: 12,
    },
    iconBox: {
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: { flexDirection: 'row', alignItems: 'center' },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sectionTitle: {
      marginBottom: spacing.md,
      marginTop: spacing.md,
      paddingHorizontal: spacing.xs,
    },
    prCard: {
      marginBottom: spacing.sm,
    },
    prBadge: {
      backgroundColor: 'rgba(255, 122, 0, 0.1)',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 8,
    },
    chartPlaceholder: {
      height: 200,
    },
    fakeChart: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    chartBar: {
      width: 30,
      borderRadius: 6,
    },
  })
