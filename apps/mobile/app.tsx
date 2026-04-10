import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { TabNavigator } from '@/navigation/TabNavigator'
import { LanguageProvider } from '@/shared/i18n'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <TabNavigator />
        </NavigationContainer>
      </LanguageProvider>
    </SafeAreaProvider>
  )
}
