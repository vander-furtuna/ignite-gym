import { ExerciseCard } from '@components/exercise-card'
import { Group } from '@components/group'
import { HomeHeader } from '@components/home-header'
import { Heading, HStack, Text, VStack } from '@gluestack-ui/themed'
import { useState } from 'react'
import { FlatList } from 'react-native'

const GROUPS = [
  'Costas',
  'Pernas',
  'Peito',
  'Ombros',
  'Bíceps',
  'Tríceps',
  'Abdômen',
]

const EXERCISES = [
  {
    id: '1',
    name: 'Supino reto',
    image:
      'https://conteudo.imguol.com.br/c/entretenimento/df/2017/07/19/homem-na-academia-homem-fazendo-musculacao-1500511253956_v2_1920x1280.jpg',
    series: '3 séries x 10 repetições',
  },
  {
    id: '2',
    name: 'Puxada frontal',
    image:
      'https://conteudo.imguol.com.br/c/entretenimento/df/2017/07/19/homem-na-academia-homem-fazendo-musculacao-1500511253956_v2_1920x1280.jpg',
    series: '3 séries x 10 repetições',
  },
  {
    id: '3',
    name: 'Agachamento',
    image:
      'https://conteudo.imguol.com.br/c/entretenimento/df/2017/07/19/homem-na-academia-homem-fazendo-musculacao-1500511253956_v2_1920x1280.jpg',
    series: '3 séries x 10 repetições',
  },
  {
    id: '4',
    name: 'Rosca direta',
    image:
      'https://conteudo.imguol.com.br/c/entretenimento/df/2017/07/19/homem-na-academia-homem-fazendo-musculacao-1500511253956_v2_1920x1280.jpg',
    series: '3 séries x 10 repetições',
  },
  {
    id: '5',
    name: 'Tríceps testa',
    image:
      'https://conteudo.imguol.com.br/c/entretenimento/df/2017/07/19/homem-na-academia-homem-fazendo-musculacao-1500511253956_v2_1920x1280.jpg',
    series: '3 séries x 10 repetições',
  },
  {
    id: '6',
    name: 'Abdominal infra',
    image:
      'https://conteudo.imguol.com.br/c/entretenimento/df/2017/07/19/homem-na-academia-homem-fazendo-musculacao-1500511253956_v2_1920x1280.jpg',
    series: '3 séries x 10 repetições',
  },
]

export function Home() {
  // const [groups, setGroups] = useState(GROUPS)
  const [groupSelected, setGroupSelected] = useState('Costas')

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={GROUPS}
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
            {EXERCISES.length}
          </Text>
        </HStack>
        <FlatList
          data={EXERCISES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ExerciseCard />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        />
      </VStack>
    </VStack>
  )
}
