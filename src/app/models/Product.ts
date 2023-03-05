export interface ICategory {
  id: number,
  name: string,
  image: string
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
export interface ILoadMore {
  limit: number,
  offset: number
}

export interface ICreateProductDTO extends Omit<IProduct, 'id' | 'category'> {
  categoryId: number
}
export interface ICreateCategoryDTO extends Omit<ICategory, 'id'> {
}

export interface IUpdateProductDTO extends Partial<ICreateProductDTO> { }
