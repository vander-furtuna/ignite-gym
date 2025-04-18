import { api } from '@services/api'

export async function registerExerciseToHistory(exerciseId: number) {
  await api.post('/history', {
    exercise_id: exerciseId,
  })
}
