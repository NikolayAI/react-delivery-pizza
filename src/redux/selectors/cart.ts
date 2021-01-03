import { RootState } from '../reducers'
import { createSelector } from 'reselect'

const getCart = (state: RootState) => state.cart
export const selectCart = createSelector(getCart, (cart) => cart)

const getCartItems = (state: RootState) => state.cart.items
export const selectCartItems = createSelector(getCartItems, (items) => items)
