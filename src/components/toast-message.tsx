import {
  HStack,
  Icon,
  Pressable,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from '@gluestack-ui/themed'
import { X } from 'lucide-react-native'

interface ToastMessageProps {
  id: string
  title: string
  description?: string
  action?: 'error' | 'success'
  onClose: () => void
}

export function ToastMessage({
  id,
  title,
  description,
  action,
  onClose,
}: ToastMessageProps) {
  return (
    <Toast
      nativeID={`toast-${id}`}
      action={action}
      bgColor={action === 'success' ? '$green500' : '$red500'}
      mt="$10"
    >
      <VStack space="xs" w="$full">
        <HStack>
          <ToastTitle color="$white" fontFamily="$heading" flex={1}>
            {title}
          </ToastTitle>
          <Pressable onPress={onClose} alignSelf="flex-end">
            <Icon as={X} color="$coolGray50" size="md" />
          </Pressable>
        </HStack>

        {description && (
          <ToastDescription color="$white">{description}</ToastDescription>
        )}
      </VStack>
    </Toast>
  )
}
