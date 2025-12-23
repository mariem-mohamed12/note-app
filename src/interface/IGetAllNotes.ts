export interface IGetAllNotesRes {
  msg: string
  notes: IALLNotes[]
}

export interface IALLNotes {
  _id: string
  title: string
  content: string
  createdBy: string
  createdAt: string
  updatedAt: string
  __v: number
}
