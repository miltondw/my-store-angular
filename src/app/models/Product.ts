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
  images: string[],
  taxes?: number
}

export interface ICreateProductDTO extends Omit<IProduct, 'id' | 'category'> {
  categoryId: number
}

export interface IUpdateProductDTO extends Partial<ICreateProductDTO> { }
