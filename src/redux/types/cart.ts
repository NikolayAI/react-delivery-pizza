export interface ICartItem {
  id: number
  name: string
  imageUrl: string
  price: number
  type: string
  size: number
}

export interface ICartItemsValue {
  items: ICartItem[]
  totalItemPrice: number
}

export interface ICartItems {
  [key: string]: ICartItemsValue
}
