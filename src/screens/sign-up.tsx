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
import type { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { signUp } from '@services/auth/sign-up'
import { AppError } from '@utils/app-error'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const signUpFormSchema = z
  .object({
    name: z
      .string({
        required_error: 'Nome é obrigatório',
      })
      .min(3, { message: 'Nome muito curto' }),
    email: z
      .string({
        required_error: 'E-mail é obrigatório',
      })
      .email({ message: 'E-mail inválido' }),
    password: z
      .string({
        required_error: 'Senha é obrigatória',
      })
      .min(6, { message: 'Senha muito curta' }),
    passwordConfirmation: z
      .string({
        required_error: 'Confirmação de senha é obrigatória',
      })
      .min(6, { message: 'Senha muito curta' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não são iguais',
    path: ['passwordConfirmation'],
  })

type SignUpFormSchema = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const { onSignIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    reValidateMode: 'onSubmit',
  })

  const navigator = useNavigation<AuthNavigatorRoutesProps>()
  const toast = useToast()

  async function handleSignUp({ name, email, password }: SignUpFormSchema) {
    try {
      await signUp({
        name,
        email,
        password,
      })

      await onSignIn({ email, password })

      toast.show({
        placement: 'bottom',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Conta criada com sucesso"
            action="success"
            onClose={() => toast.close(id)}
          />
        ),
      })
      reset()
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : 'Não foi possível criar a conta. Tente novamente mais tarde.'

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
            <Heading color="$gray100">Crie sua conta</Heading>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                  error={errors.name?.message}
                />
              )}
            />
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
                />
              )}
            />
            <Controller
              control={control}
              name="passwordConfirmation"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confime sua senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                  error={errors.passwordConfirmation?.message}
                />
              )}
            />

            <Button
              label="Criar e acessar"
              onPress={handleSubmit(handleSignUp)}
              isLoading={isSubmitting}
            />
          </Center>
          <Center flex={1} justifyContent="flex-end" mt="$4">
            <Text color="$gray100" fontSize="$sm" fontFamily="$body" mb="$3">
              Já possui uma conta?
            </Text>
            <Button
              label="Entrar"
              variant="outline"
              onPress={() => navigator.navigate('signIn')}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
