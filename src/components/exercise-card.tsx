import type { Exercise } from '@dtos/exercise-dto'
import {
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { api } from '@services/api'
import { ChevronRight } from 'lucide-react-native'
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native'

interface ExerciseCardProps extends TouchableOpacityProps {
  exercise: Exercise
}

export function ExerciseCard({ exercise, ...rest }: ExerciseCardProps) {
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
            uri: `${api.defaults.baseURL}/exercise/thumb/${exercise.thumb}`,
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
            {exercise.name}
          </Heading>
          <Text
            color="$gray200"
            fontSize="$sm"
            fontFamily="$body"
            mt="$1"
            numberOfLines={2}
          >
            {exercise.series} séries x {exercise.repetitions} repetições
          </Text>
        </VStack>

        <Icon as={ChevronRight} color="$gray300" />
      </HStack>
    </TouchableOpacity>
  )
}
