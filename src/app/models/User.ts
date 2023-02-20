
export interface IUser {
  id: number
  name: string
  password: string
  email: string
}

export interface ICreateUserDTO extends Omit<IUser, 'id'> { }

