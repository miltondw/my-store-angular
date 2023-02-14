export interface ICategory {
  id: number,
  name: string,
  typeImg: any
}
export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  category: ICategory
  images: string[]
}
