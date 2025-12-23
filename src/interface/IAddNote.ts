export interface IAddNoteRes {
  msg: string
  note: Note
}

export interface Note {
  title: string
  content: string
  createdBy: string
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface INoteValues {
  title: string,
  content: string
}

