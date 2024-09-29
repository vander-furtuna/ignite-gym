import BodyIcon from '@assets/body.svg'
import RepsIcon from '@assets/repetitions.svg'
import SeriesIcon from '@assets/series.svg'
import { Button } from '@components/button'
import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import { ChevronLeft } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <VStack flex={1}>
      <VStack px="$8" bg="$gray600" pt="$12">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ChevronLeft} color="$green500" size="xl" />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt="$4"
          mb="$8"
        >
          <Heading
            color="$gray100"
            fontFamily="$heading"
            fontSize="$lg"
            flexShrink={1}
          >
            Puxada Frontal
          </Heading>
          <HStack alignItems="center">
            <BodyIcon />
            <Text color="$gray200" ml="$1" textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <VStack p="$8">
          <Image
            source={{
              uri: 'https://conteudo.imguol.com.br/c/entretenimento/df/2017/07/19/homem-na-academia-homem-fazendo-musculacao-1500511253956_v2_1920x1280.jpg',
            }}
            alt="Imagem do exercício"
            w="$full"
            h="$80"
            rounded="$lg"
            mb="$3"
            resizeMode="cover"
          />

          <Box bg="$gray600" rounded="$lg" pb="$4" px="$4">
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mb="$6"
              mt="$5"
            >
              <HStack>
                <SeriesIcon />
                <Text color="$gray200" ml="$2">
                  3 séries
                </Text>
              </HStack>
              <HStack>
                <RepsIcon />
                <Text color="$gray200" ml="$2">
                  10 repetições
                </Text>
              </HStack>
            </HStack>

            <Button label="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
