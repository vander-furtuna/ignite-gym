import { Loading } from '@components/loading'
import { AuthProvider } from '@contexts/auth'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { Routes } from '@routes/index'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@utils/query-client'
import { StatusBar } from 'react-native'

import { config } from './config/gluestack-ui.config'

export default function App() {
  const [isFontLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
  })

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{isFontLoaded ? <Routes /> : <Loading />}</AuthProvider>
      </QueryClientProvider>
    </GluestackUIProvider>
  )
}
