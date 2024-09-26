import { Center, Spinner } from '@gluestack-ui/themed'

export function Loading() {
  return (
    <Center flex={1}>
      <Spinner color="$green500" size={48} />
    </Center>
  )
}
