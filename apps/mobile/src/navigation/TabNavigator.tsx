import React, { useState, useRef } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BlurView } from 'expo-blur'
import {
  LayoutDashboard,
  Dumbbell,
  BarChart3,
  User,
  Plus,
  Weight,
  Utensils,
  X,
  Camera,
} from 'lucide-react-native'
import { colors, spacing } from '../shared/theme'
import { Dashboard } from '../features/dashboard/screens/Dashboard'
import { WorkoutMode } from '../features/workout/screens/Workout'
import { Metrics } from '../features/metrics/screens/Metrics'
import { Profile } from '../features/profile/screens/Profile'
import { Typography } from '../shared/components/ui/Typography'

const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const animation = useRef(new Animated.Value(0)).current

  const toggleMenu = () => {
    const toValue = isMenuOpen ? 0 : 1
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start()
    setIsMenuOpen(!isMenuOpen)
  }

  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  })

  const menuItems = [
    { id: 'weight', icon: Weight, color: '#00A74B', label: 'PESO' },
    { id: 'meal', icon: Utensils, color: '#3F7AFF', label: 'REFEIÇÃO' },
  ]

  const getAnimatedStyle = (index: number) => {
    const totalItems = menuItems.length
    const finalDistance = 100

    // Distribute icons in a semi-circle (from 30 to 150 degrees)
    let angle
    if (totalItems === 1) {
      angle = 90
    } else {
      const startAngle = 45
      const endAngle = 135
      const step = (endAngle - startAngle) / (totalItems - 1)
      angle = startAngle + index * step
    }

    const radian = (angle * Math.PI) / 180

    const translateX = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -finalDistance * Math.cos(radian)],
    })

    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -finalDistance * Math.sin(radian)],
    })

    const scale = animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    })

    return {
      transform: [{ translateX }, { translateY }, { scale }],
      opacity: animation,
    }
  }

  return (
    <View style={{ flex: 1 }}>
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
                  borderBottomColor: 'rgba(255,255,255,0.05)',
                },
              ]}
            />
          ),
          headerTitleStyle: {
            color: colors.text,
            fontSize: 18,
            fontWeight: '700',
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: styles.tabBar,
          tabBarBackground: () => (
            <View style={styles.tabBarBgContainer}>
              <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />
            </View>
          ),
          tabBarIcon: ({ color, focused }) => {
            const iconSize = 24
            let icon

            if (route.name === 'Dashboard') icon = <LayoutDashboard color={color} size={iconSize} />
            else if (route.name === 'Treino') icon = <Dumbbell color={color} size={iconSize} />
            else if (route.name === 'Estatísticas')
              icon = <BarChart3 color={color} size={iconSize} />
            else if (route.name === 'Perfil') icon = <User color={color} size={iconSize} />

            if (route.name === 'Action') return null

            return (
              <View style={styles.iconContainer}>
                {icon}
                {focused && <View style={styles.indicator} />}
              </View>
            )
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
                  source={{
                    uri: 'https://media.licdn.com/dms/image/v2/D4E03AQGatryqpv3czg/profile-displayphoto-scale_200_200/B4EZ1ziihZJcAc-/0/1775759931533?e=2147483647&v=beta&t=qwqPTG8tEeFEv_iudK-iOtJWUgsjdQleGEfEWT9V7CE',
                  }}
                  style={styles.headerProfilePic}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen name="Treino" component={WorkoutMode} />

        <Tab.Screen
          name="Action"
          component={View}
          listeners={{
            tabPress: (e) => {
              e.preventDefault()
              toggleMenu()
            },
          }}
          options={{
            tabBarIcon: () => (
              <View style={styles.actionButtonOuter}>
                <Animated.View style={styles.actionButton}>
                  {isMenuOpen ? (
                    <X color="white" size={30} strokeWidth={2.5} />
                  ) : (
                    <Camera color="white" size={32} strokeWidth={2} />
                  )}
                </Animated.View>
              </View>
            ),
          }}
        />

        <Tab.Screen name="Estatísticas" component={Metrics} />
        <Tab.Screen name="Perfil" component={Profile} />
      </Tab.Navigator>

      {isMenuOpen && (
        <Pressable style={StyleSheet.absoluteFill} onPress={toggleMenu} pointerEvents="auto" />
      )}

      <View style={styles.floatingMenuContainer} pointerEvents="box-none">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <Animated.View key={item.id} style={[styles.floatingOption, getAnimatedStyle(index)]}>
              <TouchableOpacity
                style={[styles.optionButton, { backgroundColor: item.color }]}
                onPress={() => {
                  toggleMenu()
                  // Handle action based on item.id
                }}
              >
                <Icon color="white" size={20} />
              </TouchableOpacity>
              <Typography variant="label" style={styles.optionLabel}>
                {item.label}
              </Typography>
            </Animated.View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    height: 90,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    paddingTop: 12,
  },
  tabBarBgContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 13, 13, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  actionButtonOuter: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    borderWidth: 2,
    borderColor: colors.border,
  },
  iconMerge: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusOverlay: {
    position: 'absolute',
    bottom: -2,
    right: -4,
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: 6,
  },
  headerProfilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  floatingMenuContainer: {
    position: 'absolute',
    bottom: 75,
    left: Dimensions.get('window').width / 2,
    width: 0,
    height: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingOption: {
    position: 'absolute',
    alignItems: 'center',
    width: 80,
  },
  optionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  optionLabel: {
    color: colors.text,
    fontSize: 10,
    marginTop: 4,
    fontWeight: '700',
  },
})
