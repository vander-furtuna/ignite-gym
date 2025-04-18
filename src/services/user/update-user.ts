import { api } from '@services/api'

interface UpdateUserBody {
  name: string
  password?: string | null
  old_password?: string | null
}

export async function updateUser({
  name,
  old_password,
  password,
}: UpdateUserBody) {
  await api.put('/users', {
    name,
    old_password,
    password,
  })
}
