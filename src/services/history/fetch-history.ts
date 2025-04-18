import type { HistoryGroupByDate } from '@dtos/history-dto'
import { api } from '@services/api'

export async function fetchHistory() {
  const response = await api.get('/history')

  return response.data as HistoryGroupByDate[]
}
