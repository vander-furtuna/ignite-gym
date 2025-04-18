import type { History } from '@dtos/history-dto'
import { Heading, HStack, Text, VStack } from '@gluestack-ui/themed'

interface HistoryCardProps {
  history: History
}

export function HistoryCard({ history }: HistoryCardProps) {
  return (
    <HStack
      w="$full"
      px="$5"
      py="$4"
      mb="$3"
      bg="$gray600"
      rounded="$md"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack mr="$5" flex={1}>
        <Heading
          color="$white"
          fontSize="$md"
          textTransform="capitalize"
          fontFamily="$heading"
          numberOfLines={1}
        >
          {history.group}
        </Heading>
        <Text color="$gray100" fontSize="$lg" numberOfLines={1}>
          {history.name}
        </Text>
      </VStack>

      <Text color="$gray300" fontSize="$md">
        {history.hour}
      </Text>
    </HStack>
  )
}
