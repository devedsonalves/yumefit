import * as SecureStore from 'expo-secure-store';

export const secureStorage = {
  getItem(key: string) {
    return SecureStore.getItemAsync(key);
  },
  setItem(key: string, value: string) {
    return SecureStore.setItemAsync(key, value, {
      keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
    });
  },
  removeItem(key: string) {
    return SecureStore.deleteItemAsync(key);
  },
};
