import { HistoryCard } from '@components/history-card'
import { ScreenHeader } from '@components/screen-header'
import { Heading, VStack } from '@gluestack-ui/themed'
import { useMemo } from 'react'
import { SectionList } from 'react-native'

const EXERCISES_PER_DAY = [
  {
    title: '22/07/2024',
    data: [
      {
        id: '1',
        category: 'Costas',
        name: 'Puxada frontal',
        time: '08:56',
      },
      {
        id: '2',
        category: 'Pernas',
        name: 'Agachamento',
        time: '09:30',
      },
      {
        id: '3',
        category: 'Peito',
        name: 'Supino reto',
        time: '10:15',
      },
    ],
  },
  {
    title: '21/07/2024',
    data: [
      {
        id: '4',
        category: 'Bíceps',
        name: 'Rosca direta',
        time: '08:56',
      },
      {
        id: '5',
        category: 'Tríceps',
        name: 'Tríceps testa',
        time: '09:30',
      },
      {
        id: '6',
        category: 'Abdômen',
        name: 'Abdominal infra',
        time: '10:15',
      },
    ],
  },
  {
    title: '20/07/2024',
    data: [
      {
        id: '7',
        category: 'Costas',
        name: 'Puxada frontal',
        time: '08:56',
      },
      {
        id: '8',
        category: 'Pernas',
        name: 'Agachamento',
        time: '09:30',
      },
      {
        id: '9',
        category: 'Peito',
        name: 'Supino reto',
        time: '10:15',
      },
    ],
  },
  {
    title: '19/07/2024',
    data: [
      {
        id: '10',
        category: 'Bíceps',
        name: 'Rosca direta',
        time: '08:56',
      },
      {
        id: '11',
        category: 'Tríceps',
        name: 'Tríceps testa',
        time: '09:30',
      },
      {
        id: '12',
        category: 'Abdômen',
        name: 'Abdominal infra',
        time: '10:15',
      },
    ],
  },
]
export function History() {
  const isExercisesEmpty = useMemo(() => EXERCISES_PER_DAY.length === 0, [])
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={EXERCISES_PER_DAY}
        keyExtractor={(item) => item.name}
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
        renderItem={({ item }) => <HistoryCard />}
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
    </VStack>
  )
}
