export interface ProductRow {
  brand: string
  model: string
  color: string
  storage: string
  ram: string
  price: string
  imageurl: string
  stock: string
}

export interface ProductVariant {
  color: string
  storage: string
  ram: string
  price: number
  images: string[]
  stock: number
}

export interface GroupedProduct {
  brand: string
  model: string
  variants: ProductVariant[]
  colors: string[]
  storages: string[]
  rams: string[]
  minPrice: number
  maxPrice: number
}
