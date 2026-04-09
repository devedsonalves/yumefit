import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { TabNavigator } from "./navigation/TabNavigator";
import { LanguageProvider } from "./shared/i18n";

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <TabNavigator />
      </NavigationContainer>
    </LanguageProvider>
  );
}
