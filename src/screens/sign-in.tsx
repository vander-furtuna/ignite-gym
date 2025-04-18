import backgroundImage from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Button } from '@components/button'
import { Input } from '@components/input'
import { ToastMessage } from '@components/toast-message'
import { useAuth } from '@contexts/auth'
import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import type { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { AppError } from '@utils/app-error'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const signInFormSchema = z.object({
  email: z.string({
    required_error: 'E-mail é obrigatório',
  }),
  password: z.string({
    required_error: 'Senha é obrigatória',
  }),
})

type SignInFormData = z.infer<typeof signInFormSchema>

export function SignIn() {
  const { onSignIn } = useAuth()

  const toast = useToast()
  const { navigate } = useNavigation<
    AuthNavigatorRoutesProps & AppNavigatorRoutesProps
  >()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
  })

  async function handleSignIn({ email, password }: SignInFormData) {
    try {
      await onSignIn({
        email,
        password,
      })
      toast.show({
        placement: 'bottom',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Bem vindo!"
            action="success"
            onClose={() => toast.close(id)}
          />
        ),
      })

      reset()
    } catch (error) {
      console.error(error)
      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : 'Não foi possível entrar. Tente novamente mais tarde.'

      toast.show({
        placement: 'bottom',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Erro"
            description={message}
            action="error"
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image
          source={backgroundImage}
          defaultSource={backgroundImage}
          w="$full"
          h={624}
          alt="Pessoas treinando"
          position="absolute"
        />
        <VStack flex={1} px="$10" pb="$16">
          <Center my="$24">
            <Logo />

            <Text color="$gray100" fontSize="$sm">
              Treine sua mente e o seu corpo
            </Text>
          </Center>

          <Center gap="$2">
            <Heading color="$gray100">Acesse sua conta</Heading>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  error={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  error={errors.password?.message}
                  onSubmitEditing={handleSubmit(handleSignIn)}
                  returnKeyType="send"
                />
              )}
            />

            <Button
              label="Entrar"
              onPress={handleSubmit(handleSignIn)}
              isLoading={isSubmitting}
            />
          </Center>
          <Center flex={1} justifyContent="flex-end" mt="$4">
            <Text color="$gray100" fontSize="$sm" fontFamily="$body" mb="$3">
              Ainda não tem acesso?
            </Text>

            <Button
              label="Criar conta"
              variant="outline"
              onPress={() => navigate('signUp')}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
