import { cartActionsType, ICartItem } from '../actions/cart'

const initialState = {
  items: {} as ICartItems,
  totalPrice: 0,
  totalCount: 0,
}

export const cart = (state = initialState, action: cartActionsType) => {
  switch (action.type) {
    case 'ADD_ITEM_TO_CART': {
      const currentItem = state.items[action.payload.id]
        ? [...state.items[action.payload.id].items, action.payload]
        : [action.payload]

      const { newItems, totalPrice, allItemsInCart } = generateNewItem(
        state,
        action.payload.id,
        currentItem
      )

      return {
        ...state,
        items: newItems,
        totalCount: allItemsInCart.length,
        totalPrice,
      }
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: {},
        totalPrice: 0,
        totalCount: 0,
      }

    case 'REMOVE_CART_ITEM_ROW': {
      return removeCartItemRowFlow(state, action)
    }

    case 'INCREASE_CART_ITEM': {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ]

      const { newItems, totalPrice, allItemsInCart } = generateNewItem(
        state,
        action.payload,
        newObjItems
      )

      return {
        ...state,
        items: newItems,
        totalPrice,
        totalCount: allItemsInCart.length,
      }
    }

    case 'DECREASE_CART_ITEM': {
      const oldItems = state.items[action.payload].items
      const newObjItems =
        oldItems.length > 0
          ? state.items[action.payload].items.slice(1)
          : oldItems

      if (newObjItems.length < 1) {
        return removeCartItemRowFlow(state, action)
      }

      const { newItems, totalPrice, allItemsInCart } = generateNewItem(
        state,
        action.payload,
        newObjItems
      )

      return {
        ...state,
        items: newItems,
        totalPrice,
        totalCount: allItemsInCart.length,
      }
    }

    default:
      return state
  }
}

const getTotalPrice = (arr: ICartItem[]) => {
  return arr.reduce((acc, item: ICartItem) => acc + item.price, 0)
}

const removeCartItemRowFlow = (state: any, action: any) => {
  const newItems = {
    ...state.items,
  }
  const currentTotalPrice = newItems[action.payload].totalItemPrice
  const currentTotalCount = newItems[action.payload].items.length
  delete newItems[action.payload]

  return {
    ...state,
    items: newItems,
    totalPrice: state.totalPrice - currentTotalPrice,
    totalCount: state.totalCount - currentTotalCount,
  }
}

const generateNewItem = (state: any, itemId: number, arr: ICartItem[]) => {
  const newItems: ICartItems = {
    ...state.items,
    [itemId]: {
      items: arr,
      totalItemPrice: getTotalPrice(arr),
    },
  }

  const items = Object.values(newItems).map(
    (item: ICartItemsValue) => item.items
  )
  const allItemsInCart = items.flat(1)
  const totalPrice = getTotalPrice(allItemsInCart)

  return { newItems, totalPrice, allItemsInCart }
}

interface ICartItemsValue {
  items: ICartItem[]
  totalItemPrice: number
}

interface ICartItems {
  [key: string]: ICartItemsValue
}
