import { Loading } from '@components/loading'
import { useAuth } from '@contexts/auth'
import { Box } from '@gluestack-ui/themed'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { setBackgroundColorAsync } from 'expo-navigation-bar'

import { gluestackUIConfig } from '../../config/gluestack-ui.config'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export function Routes() {
  const { user, isLoadingUser } = useAuth()
  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.gray700
  setBackgroundColorAsync(
    user?.id
      ? gluestackUIConfig.tokens.colors.gray600
      : gluestackUIConfig.tokens.colors.gray700,
  )

  if (isLoadingUser) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer theme={theme}>
        {user?.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
