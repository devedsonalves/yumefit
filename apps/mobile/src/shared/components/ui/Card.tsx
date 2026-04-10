import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { colors, radius, spacing } from '../../theme'

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle
  variant?: 'elevated' | 'outline' | 'flat' | 'glass'
}

export const Card = ({ children, style, variant = 'flat' }: CardProps) => {
  if (variant === 'glass') {
    const flattenedStyle = StyleSheet.flatten(style)
    const {
      padding,
      paddingHorizontal,
      paddingVertical,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      flexDirection,
      alignItems,
      justifyContent,
      gap,
      rowGap,
      columnGap,
      flexWrap,
      alignContent,
      ...containerStyle
    } = flattenedStyle || {}

    const innerStyle = {
      padding: padding ?? spacing.md,
      paddingHorizontal,
      paddingVertical,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      flexDirection,
      alignItems,
      justifyContent,
      gap,
      rowGap,
      columnGap,
      flexWrap,
      alignContent,
    }

    return (
      <View style={[styles.base, styles.glass, containerStyle]}>
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.12)', 'rgba(255, 255, 255, 0.02)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={innerStyle}>{children}</View>
      </View>
    )
  }
  return <View style={[styles.base, styles[variant] as ViewStyle, style]}>{children}</View>
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    padding: spacing.md,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  flat: {},
  outline: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  glass: {
    backgroundColor: 'rgba(31, 31, 31, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    padding: 0, // Reset padding for the container so absoluteFill works correctly
  },
})
