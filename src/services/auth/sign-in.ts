import { api } from '@services/api'

interface SignInBody {
  email: string
  password: string
}

export async function signIn({ email, password }: SignInBody) {
  const { data } = await api.post('/sessions', {
    email,
    password,
  })
  return data
}
