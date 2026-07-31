import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Yume Fit',
  slug: 'yume-fit-mobile',
  scheme: 'yumefit',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  backgroundColor: '#F7F3EC',
  primaryColor: '#305F4F',
  ios: {
    bundleIdentifier: 'com.yumefit.mobile',
    supportsTablet: true,
    config: {
      usesNonExemptEncryption: false,
    },
  },
  android: {
    package: 'com.yumefit.mobile',
    adaptiveIcon: {
      backgroundColor: '#F7F3EC',
    },
    predictiveBackGestureEnabled: true,
  },
  plugins: [
    'expo-router',
    [
      'expo-secure-store',
      {
        configureAndroidBackup: true,
        faceIDPermission: 'Permitir que o Yume Fit use Face ID para proteger sua sessao.',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    tsconfigPaths: true,
  },
  extra: {
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
  },
};

export default config;
