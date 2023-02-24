
export interface IUser {
  id: number
  name: string
  password: string
  email: string
  role?: 'costumer' | 'admin'
}

export interface ICreateUserDTO extends Omit<IUser, 'id'> { }

