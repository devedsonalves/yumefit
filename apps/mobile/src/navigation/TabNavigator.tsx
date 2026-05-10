import { useState, useRef } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Animated,
  Dimensions,
  Alert,
} from 'react-native'
import { useAppTheme } from '@/shared/theme/ThemeProvider'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  LayoutDashboard,
  Dumbbell,
  User,
  Weight,
  Utensils,
  X,
  Camera,
} from 'lucide-react-native'
import { Dashboard } from '../features/dashboard/screens/Dashboard'
import { WorkoutMode } from '../features/workout/screens/Workout'
import { Diet } from '../features/diet/screens/Diet'
import { Profile } from '../features/profile/screens/Profile'
import { Typography } from '../shared/components/ui/Typography'
import { ActionModal } from '@/shared/components/ui/ActionModal'

const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
  const { theme: colors, isDark } = useAppTheme()
  const styles = useStyles(colors)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [actionModal, setActionModal] = useState<{ visible: boolean; type: 'weight' | 'meal' }>({
    visible: false,
    type: 'weight',
  })
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

  const menuItems = [
    { id: 'weight', icon: Weight, color: '#c8a45c', label: 'PESO' },
    { id: 'meal', icon: Utensils, color: '#c8a45c', label: 'REFEIÇÃO' },
  ]

  const getAnimatedStyle = (index: number) => {
    const totalItems = menuItems.length
    const finalDistance = 100

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
          headerStyle: {
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          },
          headerBackground: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: colors.background,
              }}
            />
          ),
          headerTitleAlign: 'center',
          headerTitle: () => {
            const darkLogo = require('../../assets/logo.png')
            const lightLogo = require('../../assets/logo.png')

            const logo = isDark ? darkLogo : lightLogo

            return (
              <Image
                source={logo}
                style={{
                  width: 180,
                  height: 120,
                  resizeMode: 'contain',
                }}
              />
            )
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({ color, focused }) => {
            const iconSize = 24
            let icon

            if (route.name === 'Dashboard') icon = <LayoutDashboard color={color} size={iconSize} />
            else if (route.name === 'Treino') icon = <Dumbbell color={color} size={iconSize} />
            else if (route.name === 'Dieta') icon = <Utensils color={color} size={iconSize} />
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
        <Tab.Screen name="Dashboard" component={Dashboard} />
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

        <Tab.Screen name="Dieta" component={Diet} />
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
                  setActionModal({ visible: true, type: item.id as 'weight' | 'meal' })
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

      <ActionModal
        visible={actionModal.visible}
        type={actionModal.type}
        onClose={() => setActionModal((prev) => ({ ...prev, visible: false }))}
        onSave={(value, details) => {
          setActionModal((prev) => ({ ...prev, visible: false }))
          Alert.alert(
            'Sucesso!',
            `${actionModal.type === 'weight' ? 'Peso' : 'Refeição'} salvo com sucesso!`,
          )
        }}
      />
    </View>
  )
}

const useStyles = (colors: any) =>
  StyleSheet.create({
    tabBar: {
      position: 'absolute',
      bottom: 0,
      height: 90,
      backgroundColor: colors.background,
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
      top: -20,
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
      borderColor: colors.border,
    },
    optionLabel: {
      color: colors.text,
      fontSize: 10,
      marginTop: 4,
      fontWeight: '700',
    },
  })
