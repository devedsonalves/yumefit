import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text } from "react-native";
import { healthMessage } from "@repo/core";

export default function App() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>ForgeFit Mobile</Text>
      <Text>{healthMessage()}</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
