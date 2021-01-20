import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Cart } from './Cart'
import { RootState } from '../redux/reducers'

const store: RootState = {
  filters: {
    category: 0,
    sortBy: {
      order: 'desc',
      type: 'popular',
    },
  },
  catalog: {
    items: {},
    status: '',
    error: '',
  },
  cart: {
    items: {},
    totalCount: 0,
    totalPrice: 0,
  },
}

describe('cart page render', () => {
  test('cart with item get loader', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Cart />
        </Provider>
      </BrowserRouter>
    )

    const cartItem = screen.queryByTestId('cart-item')

    expect(cartItem).toBeInTheDocument()
  })
})
