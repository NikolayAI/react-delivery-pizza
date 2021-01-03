import { cartActionsType, ICartItem } from '../actions/cart'

const getTotalPrice = (arr: ICartItem[]) => {
  return arr.reduce((acc, item: ICartItem) => acc + item.price, 0)
}

const initialState = {
  items: {} as ICartItems,
  totalPrice: 0,
  totalCount: 0,
}

export const cart = (state = initialState, action: cartActionsType) => {
  switch (action.type) {
    case 'ADD_ITEM_TO_CART':
      const currentItem = state.items[action.payload.id]
        ? [...state.items[action.payload.id].items, action.payload]
        : [action.payload]

      const newItems: ICartItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentItem,
          totalItemPrice: getTotalPrice(currentItem),
        },
      }

      const items = Object.values(newItems).map((item: ICartItemsValue) => item.items)
      const allItemsInCart = items.flat(1)
      const totalPrice = getTotalPrice(allItemsInCart)

      return {
        ...state,
        items: newItems,
        totalCount: allItemsInCart.length,
        totalPrice,
      }
    default:
      return state
  }
}

interface ICartItemsValue {
  items: ICartItem[]
  totalItemPrice: number
}

interface ICartItems {
  [key: string]: ICartItemsValue
}
