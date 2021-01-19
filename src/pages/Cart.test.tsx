import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import { Cart } from './Cart'
import { BrowserRouter } from 'react-router-dom'

describe('cart page render', () => {
  test('cart with item get loader', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Cart />
        </Provider>
      </BrowserRouter>
    )

    const cartItem = screen.getByTestId('cart-item')
    expect(cartItem).toBeDefined()
  })
})
