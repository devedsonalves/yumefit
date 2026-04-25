import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useColorScheme } from 'react-native'
import { darkColors, lightColors } from './index'
import AsyncStorage from '@react-native-async-storage/async-storage'

type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeContextType {
  mode: ThemeMode
  theme: typeof darkColors | typeof lightColors
  setMode: (mode: ThemeMode) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme()
  const [mode, setModeState] = useState<ThemeMode>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let isMounted = true
    AsyncStorage.getItem('@theme_mode')
      .then((savedMode) => {
        if (savedMode && isMounted) {
          setModeState(savedMode as ThemeMode)
        }
      })
      .catch((e) => {
        console.warn('AsyncStorage error in ThemeProvider:', e)
      })
      .finally(() => {
        if (isMounted) setMounted(true)
      })
    return () => {
      isMounted = false
    }
  }, [])

  const setMode = async (newMode: ThemeMode) => {
    setModeState(newMode)
    try {
      await AsyncStorage.setItem('@theme_mode', newMode)
    } catch (e) {
      console.warn('AsyncStorage error in ThemeProvider:', e)
    }
  }

  const isDark = mode === 'system' ? systemColorScheme === 'dark' : mode === 'dark'
  const theme = isDark ? darkColors : lightColors

  return (
    <ThemeContext.Provider value={{ mode, theme, setMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useAppTheme = () => useContext(ThemeContext)

export const createStyles = <T extends Record<string, any>>(styleCreator: (theme: any) => T) => {
  return () => {
    const { theme } = useAppTheme()
    return styleCreator(theme)
  }
}
