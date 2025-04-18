import type { User, UserCredentials } from '@dtos/user-dto'
import { api } from '@services/api'
import { signIn } from '@services/auth/sign-in'
import {
  getAuthTokenFromStorage,
  removeAuthTokenFromStorage,
  saveAuthTokenToStorage,
} from '@storage/storage-auth-token'
import {
  clearUserFromStorage,
  getUserFromStorage,
  saveUserToStorage,
} from '@storage/storage-user'
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface AuthContextProps {
  user: User
  onSignIn: ({ email, password }: UserCredentials) => Promise<void>
  signOut: () => Promise<void>
  updateUserName: (newUserName: string) => Promise<void>
  updateUserAvatar: (avatarUrl: string) => Promise<void>
  isLoadingUser: boolean
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({} as User)
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  const onSignIn = useCallback(async ({ email, password }: UserCredentials) => {
    const { user, token } = await signIn({ email, password })

    if (user) {
      await saveUserToStorage(user)
      await saveAuthTokenToStorage(token)

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      setUser(user)
    }
  }, [])

  const signOut = useCallback(async () => {
    setIsLoadingUser(true)
    setUser({} as User)
    await clearUserFromStorage()
    await removeAuthTokenFromStorage()
    setIsLoadingUser(false)
  }, [])

  const loadUserData = useCallback(async () => {
    try {
      setIsLoadingUser(true)
      const user = await getUserFromStorage()
      const token = await getAuthTokenFromStorage()
      if (user?.id && token) {
        setUser(user)
        api.defaults.headers.common.Authorization = `Bearer ${token}`
      }
    } finally {
      setIsLoadingUser(false)
    }
  }, [])

  const updateUserName = useCallback(
    async (newUserName: string) => {
      setUser((oldUser) => ({ ...oldUser, name: newUserName }))
      await saveUserToStorage({ ...user, name: newUserName })
    },
    [user],
  )

  const updateUserAvatar = useCallback(
    async (avatarUrl: string) => {
      setUser((oldUser) => ({ ...oldUser, avatar: avatarUrl }))
      await saveUserToStorage({ ...user, avatar: avatarUrl })
    },
    [user],
  )

  const value = useMemo(
    () => ({
      user,
      onSignIn,
      isLoadingUser,
      signOut,
      updateUserName,
      updateUserAvatar,
    }),
    [user, onSignIn, isLoadingUser, signOut, updateUserName, updateUserAvatar],
  )

  useEffect(() => {
    loadUserData()
  }, [loadUserData])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => subscribe()
  }, [signOut])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within a AuthContextProvider')
  }

  return context
}
