import { createSelector } from 'reselect'

import { RootState } from '../reducers'

export const getCart = (state: RootState) => state.cart
export const selectCart = createSelector(getCart, (cart) => cart)

export const getCartItems = (state: RootState) => state.cart.items
export const selectCartItems = createSelector(getCartItems, (items) => items)
