import { api } from './api'

type SignUpBody = {
  name: string
  email: string
  password: string
}

export async function signUp({ name, email, password }: SignUpBody) {
  await api.post('/users', {
    name,
    email,
    password,
  })
}
