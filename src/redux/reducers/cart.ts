import { ICartItem, ICartItems, ICartItemsValue } from '../types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {} as ICartItems,
    totalPrice: 0,
    totalCount: 0,
  },
  reducers: {
    addItemToCart(state, { payload }: PayloadAction<ICartItem>) {
      const currentItem = state.items[payload.id]
        ? [...state.items[payload.id].items, payload]
        : [payload]
      state.items[payload.id].items = currentItem
      state.items[payload.id].totalItemPrice = getTotalPrice(currentItem)

      // const newItems: ICartItems = {
      //   ...state.items,
      //   [payload.id]: {
      //     items: currentItem,
      //     totalItemPrice: getTotalPrice(currentItem),
      //   },
      // }

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
    },
    clearCart(state) {
      state.items = {}
      state.totalPrice = 0
      state.totalCount = 0
    },
    removeCartItemRow(state, { payload }: PayloadAction<number>) {
      state.totalPrice -= state.items[payload].totalItemPrice
      state.totalCount -= state.items[payload].items.length
      delete state.items[payload]
    },
  },
  extraReducers: {},
})
//
// export const cart = (state = initialState, action: cartActionsType) => {
//   switch (action.type) {
//     case 'ADD_ITEM_TO_CART': {
//       const currentItem = state.items[action.payload.id]
//         ? [...state.items[action.payload.id].items, action.payload]
//         : [action.payload]
//
//       return generateNewItem(state, action.payload.id, currentItem)
//     }
//
//     case 'CLEAR_CART': {
//       return {
//         ...state,
//         items: {},
//         totalPrice: 0,
//         totalCount: 0,
//       }
//     }
//
//     case 'REMOVE_CART_ITEM_ROW': {
//       return removeCartItemRowFlow(state, action)
//     }
//
//     case 'INCREASE_CART_ITEM': {
//       const newObjItems = [
//         ...state.items[action.payload].items,
//         state.items[action.payload].items[0],
//       ]
//
//       return generateNewItem(state, action.payload, newObjItems)
//     }
//
//     case 'DECREASE_CART_ITEM': {
//       const oldItems = state.items[action.payload].items
//       const newObjItems =
//         oldItems.length > 0
//           ? state.items[action.payload].items.slice(1)
//           : oldItems
//
//       if (newObjItems.length < 1) {
//         return removeCartItemRowFlow(state, action)
//       }
//
//       return generateNewItem(state, action.payload, newObjItems)
//     }
//
//     default:
//       return state
//   }
// }
