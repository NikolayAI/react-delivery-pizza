import { createSelector } from 'reselect'

import { RootState } from '../reducers'

const getCart = (state: RootState) => state.cart
export const selectCart = createSelector(getCart, (cart) => cart)

const getCartItems = (state: RootState) => state.cart.items
export const selectCartItems = createSelector(getCartItems, (items) => items)
