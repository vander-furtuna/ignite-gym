import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  Input as GlueStackInput,
  InputField,
} from '@gluestack-ui/themed'
import { type ComponentProps, useMemo } from 'react'

interface InputProps extends ComponentProps<typeof InputField> {
  error?: string
  isInvalid?: boolean
  isReadyOnly?: boolean
}

export function Input({
  isReadyOnly = false,
  error,
  isInvalid = false,
  ...rest
}: InputProps) {
  const isInputInvalid = useMemo(() => isInvalid || !!error, [error, isInvalid])

  return (
    <FormControl isInvalid={isInputInvalid} w="$full">
      <GlueStackInput
        isInvalid={isInputInvalid}
        h="$14"
        borderWidth="$0"
        borderRadius="$md"
        $focus={{ borderWidth: '$1', borderColor: '$green500' }}
        $invalid={{ borderWidth: '$1', borderColor: '$red500' }}
        isReadOnly={isReadyOnly}
        opacity={isReadyOnly ? 0.7 : 1}
      >
        <InputField
          px="$4"
          bg="$gray700"
          color="$white"
          fontFamily="$body"
          placeholderTextColor="$gray300"
          {...rest}
        />
      </GlueStackInput>
      {error && (
        <FormControlError>
          <FormControlErrorText color="$red500">{error}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  )
}
