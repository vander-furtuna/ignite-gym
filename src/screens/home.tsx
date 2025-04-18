import { ExerciseCard } from '@components/exercise-card'
import { Group } from '@components/group'
import { HomeHeader } from '@components/home-header'
import { Loading } from '@components/loading'
import { Heading, HStack, Text, VStack } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import { getExercisesByGroup } from '@services/exercises/get-exercises-by-group'
import { getGroups } from '@services/groups/get-groups'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'

export function Home() {
  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: () => getGroups(),
  })

  const [groupSelected, setGroupSelected] = useState<null | string>(null)

  const { data: exercises, isFetching: isExercisesFetching } = useQuery({
    queryKey: ['exercises', groupSelected],
    queryFn: () => getExercisesByGroup(groupSelected!),
    enabled: !!groupSelected,
  })

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails(exerciseId: number) {
    navigation.navigate('exercise', { exerciseId })
  }

  useEffect(() => {
    if (groups && groups.length) {
      setGroupSelected(groups?.[0])
    }
  }, [groups])

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32, gap: 12 }}
        style={{ marginVertical: 40, height: 48, maxHeight: 48 }}
      />

      <VStack px="$8" flex={1}>
        <HStack justifyContent="space-between" mb="$5" alignItems="center">
          <Heading color="$gray200" fontSize="$md" fontFamily="$heading">
            Exercícios
          </Heading>

          <Text color="$gray200" fontSize="$md" fontFamily="$body">
            {exercises?.length}
          </Text>
        </HStack>
        {isExercisesFetching ? (
          <Loading />
        ) : (
          <FlatList
            data={exercises}
            keyExtractor={(exercise) => String(exercise.id)}
            renderItem={({ item: exercise }) => (
              <ExerciseCard
                exercise={exercise}
                onPress={() => handleOpenExerciseDetails(exercise.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 32 }}
          />
        )}
      </VStack>
    </VStack>
  )
}
