export interface ISucessSignupRes{
  msg: string
  user: User
}
export interface IFailSignupRes {
  msg: string
  statusCode: number
}

export interface User {
  name: string
  email: string
  password: string
  age: number
  phone: string
  role: string
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}
export interface IRegisterValues {
  name:string
  email: string
  password: string
  age:string
  phone:string
}

