import type { Exercise } from '@dtos/exercise-dto'
import { api } from '@services/api'

export async function getExerciseById(id: number) {
  const response = await api.get(`/exercises/${id}`)

  return response.data as Exercise
}
