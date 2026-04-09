import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import {
  LayoutDashboard,
  Dumbbell,
  BarChart3,
  User,
} from "lucide-react-native";
import { colors } from "../shared/theme";
import { Dashboard } from "../features/dashboard/screens/Dashboard";
import { WorkoutMode } from "../features/workout/screens/WorkoutMode";
import { Metrics } from "../features/metrics/screens/Metrics";
import { Profile } from "../features/profile/screens/Profile";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTransparent: true,
        headerBackground: () => (
          <BlurView
            intensity={80}
            tint="dark"
            style={[
              StyleSheet.absoluteFill,
              {
                borderBottomWidth: 1,
                borderBottomColor: "rgba(255,255,255,0.05)",
              },
            ]}
          />
        ),
        headerTitleStyle: {
          color: colors.text,
          fontSize: 18,
          fontWeight: "700",
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <View style={styles.tabBarBgContainer}>
            <BlurView
              intensity={100}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
          </View>
        ),
        tabBarIcon: ({ color, focused }) => {
          const iconSize = 24;
          let icon;

          if (route.name === "Dashboard")
            icon = <LayoutDashboard color={color} size={iconSize} />;
          else if (route.name === "Training")
            icon = <Dumbbell color={color} size={iconSize} />;
          else if (route.name === "Metrics")
            icon = <BarChart3 color={color} size={iconSize} />;
          else if (route.name === "Profile")
            icon = <User color={color} size={iconSize} />;

          return (
            <View style={styles.iconContainer}>
              {icon}
              {focused && <View style={styles.indicator} />}
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerRight: () => (
            <View style={{ marginRight: 20 }}>
              <Image
                source={{ uri: "https://i.pravatar.cc/150?u=forgefit" }}
                style={styles.headerProfilePic}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen name="Training" component={WorkoutMode} />
      <Tab.Screen name="Metrics" component={Metrics} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 24,
    height: 64,
    width: "85%",
    marginHorizontal: "7.5%",
    borderRadius: 32,
    borderTopWidth: 0,
    backgroundColor: "transparent",
    elevation: 0,
    paddingBottom: 0,
    overflow: "hidden",
  },
  tabBarBgContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(31, 31, 31, 0.4)",
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: 4,
    position: "absolute",
    bottom: -10,
  },
  headerProfilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
});
