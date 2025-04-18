import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_TOKEN_STORAGE_KEY } from './storage-config'

export async function saveAuthTokenToStorage(token: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token)
}

export async function getAuthTokenFromStorage() {
  return await AsyncStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
}

export async function removeAuthTokenFromStorage() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
}
