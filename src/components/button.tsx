import {
  Button as GlueStackButton,
  ButtonSpinner,
  Text,
} from '@gluestack-ui/themed'
import type { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<typeof GlueStackButton> {
  label: string
  isLoading?: boolean
}

export function Button({
  label,
  isLoading = false,
  variant = 'solid',
  ...rest
}: ButtonProps) {
  return (
    <GlueStackButton
      w="$full"
      h="$14"
      bg={variant === 'solid' ? '$green700' : 'transparent'}
      borderWidth={variant === 'outline' ? '$1' : '$0'}
      borderColor={variant === 'outline' ? '$green700' : 'transparent'}
      rounded="$sm"
      $active-bg={variant === 'solid' ? '$green500' : '$gray500'}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner size={24} color="$white" />
      ) : (
        <Text
          color={variant === 'solid' ? '$white' : '$green500'}
          fontFamily="$body"
          fontWeight="bold"
        >
          {label}
        </Text>
      )}
    </GlueStackButton>
  )
}
