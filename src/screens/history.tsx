import { HistoryCard } from '@components/history-card'
import { Loading } from '@components/loading'
import { ScreenHeader } from '@components/screen-header'
import { Heading, VStack } from '@gluestack-ui/themed'
import { fetchHistory } from '@services/history/fetch-history'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { SectionList } from 'react-native'

export function History() {
  const { data: exercisesPerDay } = useQuery({
    queryKey: ['history'],
    queryFn: () => fetchHistory(),
  })

  const isExercisesEmpty = useMemo(
    () => exercisesPerDay?.length === 0,
    [exercisesPerDay],
  )
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {!exercisesPerDay ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercisesPerDay}
          keyExtractor={(item) => String(item.id)}
          renderSectionHeader={({ section: { title } }) => (
            <Heading
              color="$gray200"
              fontSize="$md"
              fontFamily="$heading"
              mt="$10"
              mb="$3"
            >
              {title}
            </Heading>
          )}
          renderItem={({ item: history }) => <HistoryCard history={history} />}
          style={{ paddingHorizontal: 32 }}
          contentContainerStyle={
            isExercisesEmpty && { flex: 1, justifyContent: 'center' }
          }
          ListEmptyComponent={() => (
            <Heading
              color="$gray200"
              fontSize="$md"
              fontFamily="$heading"
              textAlign="center"
            >
              Nenhum exercício registrado
            </Heading>
          )}
        />
      )}
    </VStack>
  )
}
