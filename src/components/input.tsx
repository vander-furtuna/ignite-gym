import { Input as GlueStackInput, InputField } from '@gluestack-ui/themed'
import type { ComponentProps } from 'react'

interface InputProps extends ComponentProps<typeof InputField> {}

export function Input({ ...rest }: InputProps) {
  return (
    <GlueStackInput
      h="$14"
      px="$2"
      borderWidth="$0"
      borderRadius="$md"
      bg="$gray700"
      $focus={{ borderWidth: '$1', borderColor: '$green500' }}
    >
      <InputField
        color="$white"
        fontFamily="$body"
        placeholderTextColor="$gray300"
        {...rest}
      />
    </GlueStackInput>
  )
}
