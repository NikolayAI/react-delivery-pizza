import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

import { Cart } from './Cart'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import userEvent from '@testing-library/user-event'

const items = {
  '0': {
    items: [
      {
        id: 0,
        name: 'pizza1',
        imageUrl: 'url1',
        price: 10,
        type: 'тонкое',
        size: 26,
      },
    ],
    totalItemPrice: 30,
  },
}

window.confirm = jest.fn(() => true)

const renderWithCart = () => {
  return {
    ...render(
      <BrowserRouter>
        <Provider store={store}>
          <Cart items={items} totalCount={1} totalPrice={30} />
        </Provider>
      </BrowserRouter>
    ),
  }
}

describe('cart page render', () => {
  test('cart with item get loaded', async () => {
    const { queryByTestId } = renderWithCart()

    expect(queryByTestId('cart-item')).toBeDefined()
  })

  test('cart with item confirm clear cart', async () => {
    const { getByText } = renderWithCart()

    userEvent.click(getByText(/Очистить корзину/))
    expect(window.confirm).toBeCalled()
  })

  test('cart with item decrement item', async () => {
    const { getByText, getByTestId, queryByTestId } = renderWithCart()

    expect(getByText(/1 шт/)).toBeInTheDocument()
    userEvent.click(getByTestId(/cart-item-row-remove/))
    expect(queryByTestId(/1 шт/)).not.toBeInTheDocument()
  })
})
