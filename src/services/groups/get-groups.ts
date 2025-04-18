import type { Group } from '@dtos/exercise-dto'
import { api } from '@services/api'

export async function getGroups() {
  const response = await api.get('/groups')

  return response.data as Group[]
}
