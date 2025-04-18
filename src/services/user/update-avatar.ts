import { api } from '@services/api'

export async function updateAvatar(avatar: FormData) {
  const response = await api.patch('/users/avatar', avatar, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}
