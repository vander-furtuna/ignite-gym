import {
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { ChevronRight } from 'lucide-react-native'
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native'

export function ExerciseCard({ ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="$gray500"
        alignItems="center"
        p="$2"
        pr="$4"
        rounded="$md"
        mb="$3"
      >
        <Image
          source={{
            uri: 'https://conteudo.imguol.com.br/c/entretenimento/df/2017/07/19/homem-na-academia-homem-fazendo-musculacao-1500511253956_v2_1920x1280.jpg',
          }}
          alt="Imagem do exercício"
          w="$16"
          h="$16"
          rounded="$md"
          mr="$4"
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading color="$white" fontSize="$lg" fontFamily="$heading">
            Supino reto
          </Heading>
          <Text
            color="$gray200"
            fontSize="$sm"
            fontFamily="$body"
            mt="$1"
            numberOfLines={2}
          >
            3 séries x 10 repetições
          </Text>
        </VStack>

        <Icon as={ChevronRight} color="$gray300" />
      </HStack>
    </TouchableOpacity>
  )
}
