import type { Exercise } from '@dtos/exercise-dto'
import { api } from '@services/api'

export async function getExercisesByGroup(group: string) {
  const response = await api.get(`/exercises/bygroup/${group}`)

  return response.data as Exercise[]
}
