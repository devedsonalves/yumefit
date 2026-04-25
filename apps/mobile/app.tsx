import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { TabNavigator } from '@/navigation/TabNavigator'
import { LanguageProvider } from '@/shared/i18n/LanguageProvider'
import { ThemeProvider, useAppTheme } from '@/shared/theme/ThemeProvider'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const AppContent = () => {
  const { isDark } = useAppTheme()

  return (
    <NavigationContainer>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <TabNavigator />
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
