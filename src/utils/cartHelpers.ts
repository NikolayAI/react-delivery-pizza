import { ICartItem } from '../redux/types'

export const getTotalPrice = (arr: ICartItem[]) => {
  return arr.reduce((acc, item: ICartItem) => acc + item.price, 0)
}

export const removeCartItemRowFlow = (state: any, itemId: number) => {
  state.totalPrice -= state.items[itemId].totalItemPrice
  state.totalCount -= state.items[itemId].items.length
  delete state.items[itemId]
}

export const setTotalPriceAndCountFlow = (state: any, func: Function) => {
  const items = Object.values(state.items).map((item: any) => item.items)
  const allItemsInCart = items.flat(1)

  state.totalPrice = func(allItemsInCart)
  state.totalCount = allItemsInCart.length
}

export const setItemsAndTotalItemPriceFlow = (
  state: any,
  itemId: number,
  items: ICartItem[],
  func: Function
) => {
  state.items[itemId].items = items
  state.items[itemId].totalItemPrice = func(items)
}
