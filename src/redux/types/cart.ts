import { cartActions } from '../actions'
import { InferActionsTypes } from './index'

export type cartActionsType = InferActionsTypes<typeof cartActions>

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
