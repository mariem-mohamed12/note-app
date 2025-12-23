export interface IgetUserNotesRes{
  msg: string
  notes: UserNotes[]
}

export interface UserNotes {
  _id: string
  title: string
  content: string
  createdBy: string
  createdAt: string
  updatedAt: string
  __v: number
}
