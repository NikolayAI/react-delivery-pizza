import { InferActionsTypes } from '../../utils/types/types'

export const cartActions = {
  addItemToCart: (item: ICartItem) =>
    ({ type: 'ADD_ITEM_TO_CART', payload: item } as const),
}

export type cartActionsType = InferActionsTypes<typeof cartActions>

export interface ICartItem {
  id: number
  name: string
  imageUrl: string
  price: number
  type: string
  size: number
}
