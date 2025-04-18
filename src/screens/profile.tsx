import defaultUserImg from '@assets/userPhotoDefault.png'
import { Button } from '@components/button'
import { Input } from '@components/input'
import { ScreenHeader } from '@components/screen-header'
import { ToastMessage } from '@components/toast-message'
import { UserPhoto } from '@components/user-photo'
import { useAuth } from '@contexts/auth'
import {
  Center,
  Heading,
  ScrollView,
  Text,
  useToast,
  VStack,
} from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@services/api'
import { updateAvatar } from '@services/user/update-avatar'
import { updateUser } from '@services/user/update-user'
import { useMutation } from '@tanstack/react-query'
import { AppError } from '@utils/app-error'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { Controller, useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import { z } from 'zod'

const editProfileFormSchema = z
  .object({
    name: z.string({
      required_error: 'Nome é obrigatório',
    }),
    email: z.string().email().optional(),

    oldPassword: z
      .string()
      .optional()
      .transform((value) => {
        if (value === '') {
          return undefined
        }

        return value
      }),
    newPassword: z
      .string()
      .optional()
      .transform((value) => {
        if (value === '') {
          return undefined
        }

        return value
      }),
    newPasswordConfirmation: z
      .string()
      .optional()
      .transform((value) => {
        if (value === '') {
          return undefined
        }

        return value
      }),
  })
  .refine(
    (data) => {
      if (data.newPassword || data.newPasswordConfirmation) {
        return !!data.oldPassword
      }

      return true
    },
    {
      message: 'Para alterar a senha, informe a senha antiga e a nova senha',
      path: ['oldPassword'],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword) {
        return data.newPassword === data.newPasswordConfirmation
      }

      return true
    },
    {
      message: 'As senhas não são iguais',
      path: ['newPasswordConfirmation'],
    },
  )

type EditProfileFormData = z.infer<typeof editProfileFormSchema>

export function Profile() {
  const toast = useToast()
  const { user, updateUserName, updateUserAvatar } = useAuth()
  const { control, handleSubmit } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  })

  const { mutateAsync: updateUserFn, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: (_, { name }) => {
      updateUserName(name)
      toast.show({
        placement: 'bottom',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Sucesso"
            description="Perfil atualizado com sucesso"
            action="success"
            onClose={() => toast.close(id)}
          />
        ),
      })
    },
    onError: (error) => {
      toast.show({
        placement: 'bottom',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title={
              error instanceof AppError
                ? error.message
                : 'Não foi possível atualizar o perfil'
            }
            action="error"
            onClose={() => toast.close(id)}
          />
        ),
      })
    },
  })

  async function handleUserPhotoSelect() {
    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (selectedPhoto.canceled) return

      const photoSelected = selectedPhoto.assets[0]

      if (photoSelected.uri) {
        const photoInfo = (await FileSystem.getInfoAsync(
          photoSelected.uri,
        )) as {
          size: number
        }

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            placement: 'bottom',
            render: ({ id }) => (
              <ToastMessage
                id={id}
                title="Erro"
                description="A imagem deve ter no máximo 5MB"
                action="error"
                onClose={() => toast.close(id)}
              />
            ),
          })
        }

        const fileExtension = photoSelected.uri.split('.').pop()

        const photoFile = {
          name: `${user.name}.${fileExtension}`
            .toLocaleLowerCase()
            .replace(/ /g, '_'),
          uri: photoSelected.uri,
          type: `${photoSelected.type}/${fileExtension}`,
        } as any

        const userPhotoUploadForm = new FormData()

        // const photoBlob = await (await fetch(photoFile.uri)).blob()
        userPhotoUploadForm.append('avatar', photoFile)
        const { avatar } = await updateAvatar(userPhotoUploadForm)
        updateUserAvatar(`${api.defaults.baseURL}/avatar/${avatar}`)
        console.log(avatar)
        toast.show({
          placement: 'bottom',
          render: ({ id }) => (
            <ToastMessage
              id={id}
              title="Sucesso"
              description="Foto de perfil atualizada com sucesso"
              action="success"
              onClose={() => toast.close(id)}
            />
          ),
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleProfileUpdate = async ({
    name,
    newPassword,
    oldPassword,
  }: EditProfileFormData) => {
    await updateUserFn({
      name,
      password: newPassword,
      old_password: oldPassword,
    })
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 36 }}
        style={{ paddingHorizontal: 32 }}
      >
        <Center mt="$6">
          <UserPhoto
            source={user?.avatar ? { uri: user.avatar } : defaultUserImg}
            alt="Foto de perfil"
            size="xl"
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="$green500"
              fontFamily="$heading"
              fontSize="$md"
              mt="$2"
              mb="$8"
            >
              Alterar foto
            </Text>
          </TouchableOpacity>
        </Center>

        <Center w="$full" gap="$4">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                bg="$gray600"
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                bg="$gray600"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                isReadyOnly={true}
                value={value}
                error={error?.message}
              />
            )}
          />
        </Center>

        <Heading
          alignSelf="flex-start"
          fontFamily="$heading"
          color="$gray200"
          fontSize="$md"
          mt="$12"
          mb="$2"
        >
          Alterar Senha
        </Heading>

        <Center w="$full" gap="$4">
          <Controller
            control={control}
            name="oldPassword"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                bg="$gray600"
                placeholder="Senha Antiga"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                bg="$gray600"
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="newPasswordConfirmation"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                bg="$gray600"
                placeholder="Confime sua nova senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleProfileUpdate)}
                returnKeyType="send"
                error={error?.message}
              />
            )}
          />
          <Button
            label="Atualizar"
            isLoading={isPending}
            onPress={handleSubmit(handleProfileUpdate)}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
