import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { spacing, radius } from '@/shared/theme'
import { Typography } from '@/shared/components/ui/Typography'
import { Card } from '@/shared/components/ui/Card'
import { Utensils, Droplets, Target, PieChart } from 'lucide-react-native'
import { useTranslation } from '@/shared/i18n/LanguageProvider'
import { DietSkeleton } from '../components/DietSkeleton'
import React, { useState, useEffect } from 'react'
import { useAppTheme } from '@/shared/theme/ThemeProvider'
import { LinearGradient } from 'expo-linear-gradient'

const MacroItem = ({ label, value, color, percentage }: any) => {
  const { theme: colors } = useAppTheme()
  const styles = useStyles(colors)

  return (
    <View style={styles.macroItem}>
      <Typography variant="label" color="textMuted">
        {label}
      </Typography>
      <Typography variant="body" bold>
        {value}g
      </Typography>
      <View style={styles.macroBarBg}>
        <View style={[styles.macroBarFill, { backgroundColor: color, width: `${percentage}%` }]} />
      </View>
    </View>
  )
}

const MealItem = ({ title, calories, time, icon: Icon }: any) => {
  const { theme: colors } = useAppTheme()
  const styles = useStyles(colors)

  return (
    <Card variant="glass" style={styles.mealCard}>
      <View style={styles.row}>
        <View style={styles.mealIconBox}>
          <Icon color={colors.primary} size={20} />
        </View>
        <View style={styles.mealInfo}>
          <Typography bold>{title}</Typography>
          <Typography variant="caption" color="textMuted">
            {time}
          </Typography>
        </View>
        <Typography bold color="primary">
          {calories} kcal
        </Typography>
      </View>
    </Card>
  )
}

export const Diet = () => {
  const { theme: colors } = useAppTheme()
  const styles = useStyles(colors)
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <DietSkeleton />
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Typography variant="h2" bold>
            {t('diet.title')}
          </Typography>
        </View>

        <Card variant="glass" style={styles.summaryCard}>
          <View style={styles.rowBetween}>
            <View>
              <Typography variant="caption" color="textMuted">
                {t('diet.consumed')}
              </Typography>
              <Typography variant="h1" bold>
                1,850
              </Typography>
              <Typography variant="label" color="textMuted">
                kcal
              </Typography>
            </View>
            <View style={styles.remainingBox}>
              <Typography variant="caption" color="primary" bold>
                {t('diet.remaining').toUpperCase()}
              </Typography>
              <Typography variant="h2" bold color="primary">
                650
              </Typography>
              <Typography variant="label" color="primary">
                kcal
              </Typography>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <LinearGradient
                colors={[colors.primary, colors.primaryLight]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBarFill, { width: '74%' }]}
              />
            </View>
          </View>

          <View style={styles.macrosRow}>
            <MacroItem label={t('diet.protein')} value={150} color="#FF453A" percentage={80} />
            <MacroItem label={t('diet.carbs')} value={210} color="#32D74B" percentage={65} />
            <MacroItem label={t('diet.fats')} value={65} color="#FFD60A" percentage={50} />
          </View>
        </Card>

        <Typography variant="h3" bold style={styles.sectionTitle}>
          {t('diet.meals')}
        </Typography>

        <MealItem title={t('diet.breakfast')} time="08:00 AM" calories={450} icon={Utensils} />
        <MealItem title={t('diet.lunch')} time="12:30 PM" calories={750} icon={Utensils} />
        <MealItem title={t('diet.snacks')} time="04:00 PM" calories={250} icon={Utensils} />
        <MealItem title={t('diet.dinner')} time="08:00 PM" calories={400} icon={Utensils} />

        <Typography variant="h3" bold style={styles.sectionTitle}>
          {t('diet.water')}
        </Typography>
        <Card variant="glass" style={styles.waterCard}>
          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <Droplets color={colors.primary} size={24} />
              <View style={styles.ml}>
                <Typography bold>2.4 / 3.0 {t('diet.liters')}</Typography>
                <Typography variant="caption" color="textMuted">
                  80% {t('dashboard.goal')}
                </Typography>
              </View>
            </View>
            <View style={styles.waterGrid}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <View
                  key={i}
                  style={[
                    styles.waterDrop,
                    { backgroundColor: i <= 6 ? colors.primary : colors.surfaceLight },
                  ]}
                />
              ))}
            </View>
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
      marginBottom: spacing.lg,
      paddingHorizontal: spacing.xs,
    },
    summaryCard: {
      padding: spacing.lg,
      marginBottom: spacing.xl,
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    remainingBox: {
      alignItems: 'flex-end',
    },
    progressContainer: {
      marginVertical: spacing.lg,
    },
    progressBarBg: {
      height: 12,
      backgroundColor: colors.surfaceLight,
      borderRadius: 6,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      borderRadius: 6,
    },
    macrosRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing.md,
    },
    macroItem: {
      flex: 1,
    },
    macroBarBg: {
      height: 4,
      backgroundColor: colors.surfaceLight,
      borderRadius: 2,
      marginTop: 4,
      overflow: 'hidden',
    },
    macroBarFill: {
      height: '100%',
      borderRadius: 2,
    },
    sectionTitle: {
      marginBottom: spacing.md,
      marginTop: spacing.md,
      paddingHorizontal: spacing.xs,
    },
    mealCard: {
      marginBottom: spacing.sm,
      padding: spacing.md,
    },
    mealIconBox: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: 'rgba(200, 164, 92, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    mealInfo: {
      flex: 1,
      marginLeft: 12,
    },
    waterCard: {
      padding: spacing.md,
    },
    ml: { marginLeft: 12 },
    waterGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: 80,
      gap: 4,
      justifyContent: 'flex-end',
    },
    waterDrop: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
  })
