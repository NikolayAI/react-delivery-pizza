import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ICartItem, ICartItems } from '../types'
import {
  getTotalPrice,
  removeCartItemRowFlow,
  setItemsAndTotalItemPriceFlow,
  setTotalPriceAndCountFlow,
} from '../../utils/cartHelpers'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {} as ICartItems,
    totalPrice: 0,
    totalCount: 0,
  },
  reducers: {
    addItemToCart(state, { payload }: PayloadAction<ICartItem>) {
      if (state.items[payload.id]) {
        state.items[payload.id].items = [
          ...state.items[payload.id].items,
          payload,
        ]
        state.items[payload.id].totalItemPrice = getTotalPrice(
          state.items[payload.id].items
        )
      } else {
        state.items[payload.id] = {
          items: [payload],
          totalItemPrice: payload.price,
        }
      }

      setTotalPriceAndCountFlow(state, getTotalPrice)
    },
    increaseCartItem(state, { payload }: PayloadAction<number>) {
      const newObjItems = [
        ...state.items[payload].items,
        state.items[payload].items[0],
      ]

      setItemsAndTotalItemPriceFlow(state, payload, newObjItems, getTotalPrice)
      setTotalPriceAndCountFlow(state, getTotalPrice)
    },
    decreaseCartItem(state, { payload }: PayloadAction<number>) {
      const oldItems = state.items[payload].items
      const newObjItems =
        oldItems.length > 0 ? state.items[payload].items.slice(1) : oldItems

      if (newObjItems.length < 1) {
        removeCartItemRowFlow(state, payload)
        return
      }

      setItemsAndTotalItemPriceFlow(state, payload, newObjItems, getTotalPrice)
      setTotalPriceAndCountFlow(state, getTotalPrice)
    },
    removeCartItemRow(state, { payload }: PayloadAction<number>) {
      removeCartItemRowFlow(state, payload)
    },
    clearCart(state) {
      state.items = {}
      state.totalPrice = 0
      state.totalCount = 0
    },
  },
  extraReducers: {},
})

export const cart = cartSlice.reducer
export const {
  addItemToCart,
  clearCart,
  removeCartItemRow,
  increaseCartItem,
  decreaseCartItem,
} = cartSlice.actions
