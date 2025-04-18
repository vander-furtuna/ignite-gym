import { AppError } from '@utils/app-error'
import axios, { type AxiosInstance } from 'axios'

type SignOut = () => void

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: 'http://192.168.101.4:3333',
}) as APIInstanceProps

api.registerInterceptTokenManager = (signOut: SignOut) => {
  
}

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      console.error(error)
      return Promise.reject(
        new AppError(
          'Não foi possível realizar a operação. Tente novamente mais tarde.',
        ),
      )
    }
  },
)

export { api }
