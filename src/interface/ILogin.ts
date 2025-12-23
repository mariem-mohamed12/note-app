export interface ISucsessResLogin {
  msg: string
  token: string
}

export interface IFailResLogin {
  msg: string
  statusCode: number
}


export interface ILoginValues {
  email: string
  password: string
}

