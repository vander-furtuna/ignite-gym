import { Button } from '@components/button'
import { Input } from '@components/input'
import { ScreenHeader } from '@components/screen-header'
import { ToastMessage } from '@components/toast-message'
import { UserPhoto } from '@components/user-photo'
import {
  Center,
  Heading,
  ScrollView,
  Text,
  useToast,
  VStack,
} from '@gluestack-ui/themed'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { TouchableOpacity } from 'react-native'

export function Profile() {
  const toast = useToast()

  async function handleUserPhotoSelect() {
    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (selectedPhoto.canceled) return

      const { uri } = selectedPhoto.assets[0]

      if (uri) {
        const photoInfo = (await FileSystem.getInfoAsync(uri)) as {
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
      }
    } catch (error) {
      console.error(error)
    }
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
            source={{
              uri: 'https://github.com/vander-furtuna.png',
            }}
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
          <Input placeholder="Nome" bg="$gray600" />
          <Input placeholder="Email" bg="$gray600" isReadyOnly />
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
          <Input placeholder="Senha antiga" bg="$gray600" secureTextEntry />
          <Input placeholder="Nova senha" bg="$gray600" secureTextEntry />
          <Input
            placeholder="Confirme a nova senha"
            bg="$gray600"
            secureTextEntry
          />
          <Button label="Atualizar" />
        </Center>
      </ScrollView>
    </VStack>
  )
}
