export type History = {
  id: number
  name: string
  group: string
  hour: string
  created_at: string
}

export type HistoryGroupByDate = {
  title: string
  data: History[]
}
