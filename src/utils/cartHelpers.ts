import { ICartItem, ICartItems, ICartItemsValue } from '../redux/types'

export const getTotalPrice = (arr: ICartItem[]) => {
  return arr.reduce((acc, item: ICartItem) => acc + item.price, 0)
}

export const removeCartItemRowFlow = (state: any, action: any) => {
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

export const generateNewItem = (
  state: any,
  itemId: number,
  arr: ICartItem[]
) => {
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

  return {
    ...state,
    items: newItems,
    totalPrice,
    totalCount: allItemsInCart.length,
  }
}
