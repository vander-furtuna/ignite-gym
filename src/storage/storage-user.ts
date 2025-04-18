import type { User } from '@dtos/user-dto'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { USER_STORAGE_KEY } from './storage-config'

export async function saveUserToStorage(user: User) {
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export async function getUserFromStorage() {
  const storage = await AsyncStorage.getItem(USER_STORAGE_KEY)

  if (storage) {
    return JSON.parse(storage) as User
  }

  return {} as User
}

export async function clearUserFromStorage() {
  await AsyncStorage.removeItem(USER_STORAGE_KEY)
}
