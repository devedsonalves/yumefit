import React from 'react'
import { Text, StyleSheet, TextStyle } from 'react-native'
import { useAppTheme } from '@/shared/theme/ThemeProvider'
interface TypographyProps {
  children: React.ReactNode
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label'
  color?: string
  align?: 'left' | 'center' | 'right'
  style?: TextStyle
  bold?: boolean
}

export const Typography = ({
  variant = 'body',
  color = 'text',
  align = 'left',
  bold = false,
  style,
  children,
  ...props
}: TypographyProps) => {
  const { theme: colors } = useAppTheme()
  const styles = useStyles(colors)
  return (
    <Text
      style={[
        styles[variant],
        { color: colors[color as keyof typeof colors] || color, textAlign: align as any },
        bold && styles.bold,
        style,
      ]}
    >
      {children}
    </Text>
  )
}

const useStyles = (colors: any) =>
  StyleSheet.create({
    h1: { fontSize: 32, fontWeight: '800', lineHeight: 40 },
    h2: { fontSize: 24, fontWeight: '700', lineHeight: 32 },
    h3: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
    body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
    caption: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
      color: colors.textMuted,
    },
    label: { fontSize: 12, fontWeight: '600', letterSpacing: 1 },
    bold: { fontWeight: 'bold' },
  })
