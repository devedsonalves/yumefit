import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { colors, spacing, radius } from '../../theme'

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) => {
  const isOutline = variant === 'outline'
  const isSecondary = variant === 'secondary'

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.base, styles[size], styles[variant], disabled && styles.disabled, style]}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? colors.primary : colors.text} size="small" />
      ) : (
        <Text
          style={[
            styles.textBase,
            styles[`text${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles],
            isOutline && styles.textOutline,
            isSecondary && styles.textSecondary,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  md: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  lg: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surfaceLight,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  textBase: {
    fontWeight: 'bold',
    color: colors.text,
  },
  textSm: { fontSize: 14 },
  textMd: { fontSize: 16 },
  textLg: { fontSize: 18 },
  textOutline: { color: colors.primary },
  textSecondary: { color: colors.textMuted },
})
