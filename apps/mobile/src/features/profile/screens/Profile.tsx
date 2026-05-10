import { ScrollView, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { spacing } from '@/shared/theme'
import { Typography } from '@/shared/components/ui/Typography'
import { Card } from '@/shared/components/ui/Card'
import {
  User,
  Settings,
  Bell,
  Lock,
  ChevronRight,
  LogOut,
  CreditCard,
  Languages,
  Dumbbell,
  Flame,
  Timer,
  Moon,
} from 'lucide-react-native'
import { useAppTheme } from '@/shared/theme/ThemeProvider'
import { useTranslation } from '@/shared/i18n/LanguageProvider'
import { ProfileSkeleton } from '../components/ProfileSkeleton'
import React, { useState, useEffect } from 'react'

const MenuOption = ({ label, icon: Icon, color, onPress }: any) => {
  const { theme: colors } = useAppTheme()
  const safeColor = color || colors.text
  const styles = useStyles(colors)

  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.row}>
        <View style={[styles.menuIconBox, { backgroundColor: `${safeColor}10` }]}>
          <Icon color={safeColor} size={20} />
        </View>
        <Typography style={styles.ml}>{label}</Typography>
      </View>
      <ChevronRight color={colors.textMuted} size={18} />
    </TouchableOpacity>
  )
}

export const Profile = () => {
  const { theme: colors, mode, setMode } = useAppTheme()
  const styles = useStyles(colors)

  const { t, language, setLanguage } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <ProfileSkeleton />
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt' : 'en')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: 'https://media.licdn.com/dms/image/v2/D4E03AQGatryqpv3czg/profile-displayphoto-scale_200_200/B4EZ1ziihZJcAc-/0/1775759931533?e=2147483647&v=beta&t=qwqPTG8tEeFEv_iudK-iOtJWUgsjdQleGEfEWT9V7CE',
            }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Typography variant="h2" bold>
                Edson Alves
              </Typography>
              <View style={styles.badge}>
                <Typography style={styles.badgeText}>PRO</Typography>
              </View>
            </View>
            <Typography variant="caption" color="textMuted">
              {t('profile.member_since')} 2023
            </Typography>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Settings color={colors.text} size={20} />
          </TouchableOpacity>
        </View>

        <Card variant="glass" style={styles.statsRow}>
          <View style={styles.statBox}>
            <View style={[styles.statIconBox, { backgroundColor: `${colors.primary}15` }]}>
              <Dumbbell size={18} color={colors.primary} />
            </View>
            <Typography variant="h2" bold>
              24
            </Typography>
            <Typography variant="label" color="textMuted" align="center">
              {t('profile.workouts').toUpperCase()}
            </Typography>
          </View>

          <View style={[styles.statBox, styles.borderLeft]}>
            <View style={[styles.statIconBox, { backgroundColor: 'rgba(255, 69, 58, 0.15)' }]}>
              <Flame size={18} color={colors.error} />
            </View>
            <Typography variant="h2" bold>
              12k
            </Typography>
            <Typography variant="label" color="textMuted" align="center">
              {t('profile.calories').toUpperCase()}
            </Typography>
          </View>

          <View style={[styles.statBox, styles.borderLeft]}>
            <View style={[styles.statIconBox, { backgroundColor: 'rgba(50, 215, 75, 0.15)' }]}>
              <Timer size={18} color={colors.success} />
            </View>
            <Typography variant="h2" bold>
              15h
            </Typography>
            <Typography variant="label" color="textMuted" align="center">
              {t('profile.hours').toUpperCase()}
            </Typography>
          </View>
        </Card>

        <Typography variant="h3" bold style={styles.sectionTitle}>
          {t('profile.account')}
        </Typography>
        <Card variant="glass" style={styles.menuCard}>
          <MenuOption label={t('profile.personal_info')} icon={User} color={colors.text} />
          <View style={styles.divider} />
          <MenuOption label={t('profile.notifications')} icon={Bell} color={colors.text} />
          <View style={styles.divider} />
          <MenuOption label={t('profile.subscription')} icon={CreditCard} color={colors.text} />
          <View style={styles.divider} />
          <MenuOption
            label={`${language.toUpperCase()} (Switch)`}
            icon={Languages}
            onPress={toggleLanguage}
          />
          <View style={styles.divider} />
          <MenuOption
            label={(mode === 'dark' ? 'Dark Mode' : 'Light Mode') + ' (Switch)'}
            icon={Moon}
            onPress={() => setMode(mode === 'dark' ? 'light' : 'dark')}
          />
        </Card>

        <Typography variant="h3" bold style={styles.sectionTitle}>
          {t('profile.security')}
        </Typography>
        <Card variant="glass" style={styles.menuCard}>
          <MenuOption label={t('profile.privacy')} icon={Lock} />
          <View style={styles.divider} />
          <MenuOption label={t('profile.logout')} icon={LogOut} color={colors.error} />
        </Card>

        <View style={styles.footer}>
          <Typography variant="label" color="textMuted" align="center">
            YumeFit v1.0.0
          </Typography>
        </View>
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
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.xl,
      paddingHorizontal: spacing.xs,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 2,
      borderColor: colors.primary,
    },
    profileInfo: {
      marginLeft: spacing.lg,
      flex: 1,
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    badge: {
      backgroundColor: colors.primary,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 6,
    },
    badgeText: {
      color: colors.background,
      fontSize: 10,
      fontWeight: '800',
    },
    editButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    statsRow: {
      flexDirection: 'row',
      marginBottom: spacing.xl,
      padding: spacing.lg,
    },
    statBox: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.sm,
    },
    statIconBox: {
      width: 38,
      height: 38,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    borderLeft: {
      borderLeftWidth: 1,
      borderLeftColor: 'rgba(255, 255, 255, 0.1)',
    },
    sectionTitle: {
      marginBottom: spacing.md,
      paddingHorizontal: spacing.xs,
    },
    menuCard: {
      padding: 0,
      marginBottom: spacing.lg,
    },
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: spacing.md,
    },
    row: { flexDirection: 'row', alignItems: 'center' },
    menuIconBox: {
      width: 36,
      height: 36,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    ml: { marginLeft: 12 },
    divider: {
      height: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      marginHorizontal: spacing.md,
    },
    footer: {
      marginTop: spacing.xl,
      paddingBottom: spacing.lg,
    },
  })
