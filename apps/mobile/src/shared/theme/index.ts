export const darkColors = {
  background: '#0D0D0D',
  surface: '#1F1F1F',
  surfaceLight: '#2A2A2A',
  primary: '#c8a45c',
  primaryLight: '#e6c98a',
  primaryGlow: 'rgba(255, 122, 0, 0.15)',
  text: '#FFFFFF',
  textMuted: '#8E8E93',
  accent: '#FF9F45',
  error: '#FF453A',
  success: '#32D74B',
  border: '#323232',
} as const

export const lightColors = {
  background: '#F1F1F1',
  surface: '#FFFFFF',
  surfaceLight: '#F5F5F5',
  primary: '#c8a45c',
  primaryLight: '#e6c98a',
  primaryGlow: 'rgba(255, 122, 0, 0.15)',
  text: '#000000',
  textMuted: '#8E8E93',
  accent: '#FF9F45',
  error: '#FF3B30',
  success: '#34C759',
  border: '#E5E5EA',
} as const

export const colors = darkColors

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const

export const radius = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 32,
  full: 999,
} as const
