import { Button, Text } from '@gluestack-ui/themed'
import type { ComponentProps } from 'react'

interface GroupProps extends ComponentProps<typeof Button> {
  name: string
  isActive?: boolean
}

export function Group({ name, isActive, ...rest }: GroupProps) {
  return (
    <Button
      minWidth="$24"
      h="$10"
      bg="$gray600"
      rounded="$md"
      justifyContent="center"
      borderColor="$green500"
      borderWidth={isActive ? 1 : 0}
      sx={{
        ':active': {
          borderWidth: 1,
        },
      }}
      {...rest}
    >
      <Text
        color={isActive ? '$green500' : '$green200'}
        textTransform="uppercase"
        fontSize="$xs"
        fontWeight="bold"
      >
        {name}
      </Text>
    </Button>
  )
}
