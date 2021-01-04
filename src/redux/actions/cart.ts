import { InferActionsTypes } from '../../utils/types/types'

export const cartActions = {
  addItemToCart: (item: ICartItem) =>
    ({
      type: 'ADD_ITEM_TO_CART',
      payload: item,
    } as const),
  increaseCartItem: (itemId: number) =>
    ({
      type: 'INCREASE_CART_ITEM',
      payload: itemId,
    } as const),
  decreaseCartItem: (itemId: number) =>
    ({
      type: 'DECREASE_CART_ITEM',
      payload: itemId,
    } as const),
  removeCartItemRow: (itemId: number) =>
    ({
      type: 'REMOVE_CART_ITEM_ROW',
      payload: itemId,
    } as const),
  clearCart: () => ({ type: 'CLEAR_CART' } as const),
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
