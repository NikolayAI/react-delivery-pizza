import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { makeTestStore, testRender } from '../utils/testHelpers'
import { cartItem, cartItems } from '../utils/testFixstures'
import { Cart } from './Cart'
import {
  addItemToCart,
  clearCart,
  decreaseCartItem,
  increaseCartItem,
  removeCartItemRow,
} from '../redux/reducers/cart'

console.log = jest.fn()

describe('cart page render', () => {
  it('cart with item get loaded', async () => {
    const store = makeTestStore()
    store.dispatch(addItemToCart(cartItem))

    const { queryByTestId } = testRender(<Cart />, { store })

    expect(queryByTestId('cart-item')).toBeDefined()
  })

  it('cart with item should clear cart', async () => {
    const store = makeTestStore()
    store.dispatch(addItemToCart(cartItem))

    const { getByText } = testRender(<Cart />, { store })

    userEvent.click(getByText(/Очистить корзину/))
    expect(store.dispatch).toHaveBeenCalledWith(clearCart())
  })

  it('cart with item should remove item', async () => {
    const store = makeTestStore()
    store.dispatch(addItemToCart(cartItem))

    const { getByText, getByTestId, queryByText } = testRender(<Cart />, {
      store,
    })

    expect(getByText(/1 шт/)).toBeInTheDocument()

    userEvent.click(getByTestId(/cart-item-row-remove/))
    expect(store.dispatch).toHaveBeenCalledWith(removeCartItemRow(cartItem.id))
    expect(queryByText(/1 шт/)).not.toBeInTheDocument()
  })

  it('cart with item should increase item', async () => {
    const store = makeTestStore()
    store.dispatch(addItemToCart(cartItem))

    const { getByText, getByTestId } = testRender(<Cart />, { store })

    expect(getByText(/1 шт/)).toBeInTheDocument()

    userEvent.click(getByTestId(/cart-item-row-increase/))
    expect(store.dispatch).toHaveBeenCalledWith(increaseCartItem(cartItem.id))
    expect(getByText(/2 шт/)).toBeInTheDocument()
  })

  it('cart with item should decrease item', async () => {
    const store = makeTestStore()
    store.dispatch(addItemToCart(cartItem))

    const { getByText, getByTestId, queryByText } = testRender(<Cart />, {
      store,
    })

    expect(getByText(/1 шт/)).toBeInTheDocument()

    userEvent.click(getByTestId(/cart-item-row-decrease/))
    expect(store.dispatch).toHaveBeenCalledWith(decreaseCartItem(cartItem.id))
    expect(queryByText(/1 шт/)).not.toBeInTheDocument()
  })

  it('cart with item should checkout', async () => {
    const store = makeTestStore()
    store.dispatch(addItemToCart(cartItem))

    const { getByText } = testRender(<Cart />, { store })

    expect(getByText(/1 шт/)).toBeInTheDocument()

    userEvent.click(getByText(/Оплатить сейчас/))
    expect(console.log).toHaveBeenCalledWith('Ваш заказ: ', cartItems)
  })
})
