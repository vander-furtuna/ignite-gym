import BodyIcon from '@assets/body.svg'
import RepsIcon from '@assets/repetitions.svg'
import SeriesIcon from '@assets/series.svg'
import { Button } from '@components/button'
import { Loading } from '@components/loading'
import { ToastMessage } from '@components/toast-message'
import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from '@gluestack-ui/themed'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { getExerciseById } from '@services/exercises/get-exercise-by-id'
import { registerExerciseToHistory } from '@services/history/register-exercise-to-history'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AppError } from '@utils/app-error'
import { queryClient } from '@utils/query-client'
import { ChevronLeft } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'

interface ExerciseParams {
  exerciseId: number
}

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute()
  const toast = useToast()

  const { exerciseId } = route.params as ExerciseParams

  const { data: exercise, isFetching: isExerciseFetching } = useQuery({
    queryKey: ['exercise', exerciseId],
    queryFn: () => getExerciseById(exerciseId),
  })

  const { mutateAsync: markExerciseAsCompleted } = useMutation({
    mutationFn: registerExerciseToHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['history'],
      })
      toast.show({
        placement: 'bottom',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Parabéns! Exercício registrado no histórico."
            action="success"
            onClose={() => toast.close(id)}
          />
        ),
      })
    },
    onError: (error) => {
      toast.show({
        placement: 'bottom',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title={
              error instanceof AppError
                ? error.message
                : 'Erro ao registrar exercício no histórico.'
            }
            action="error"
            onClose={() => toast.close(id)}
          />
        ),
      })
    },
  })

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
            {exercise?.name}
          </Heading>
          <HStack alignItems="center">
            <BodyIcon />
            <Text color="$gray200" ml="$1" textTransform="capitalize">
              {exercise?.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isExerciseFetching ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <VStack p="$8" gap="$4">
            <Box rounded="$lg" overflow="hidden" w="$full" h="$80">
              <Image
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}`,
                }}
                alt="Imagem do exercício"
                w="$full"
                h="$full"
                mb="$3"
                resizeMode="cover"
              />
            </Box>

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
                    {exercise?.series} séries
                  </Text>
                </HStack>
                <HStack>
                  <RepsIcon />
                  <Text color="$gray200" ml="$2">
                    {exercise?.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button
                label="Marcar como realizado"
                onPress={() => markExerciseAsCompleted(exerciseId)}
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  )
}
