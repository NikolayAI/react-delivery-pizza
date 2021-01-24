import React from 'react'
import userEvent from '@testing-library/user-event'

import { makeTestStore, testRender } from '../utils/testHelpers'
import { Header } from './Header'
import { App } from '../app/App'

describe('header render', () => {
  it('should run to catalog page', async () => {
    const store = makeTestStore()

    const { container } = testRender(
      <App>
        <Header />
      </App>,
      { store }
    )

    expect(container.innerHTML).toMatch('Все пиццы')
  })

  it('clicking on cart button should run to cart page', async () => {
    const store = makeTestStore()

    const { container, getByTestId } = testRender(
      <App>
        <Header />
      </App>,
      { store }
    )

    userEvent.click(getByTestId('cart-link'))
    expect(container.innerHTML).toMatch('Ваша корзина пустая')
  })

  it('clicking on cart button should run to catalog page', async () => {
    const store = makeTestStore()

    const { container, getByTestId } = testRender(
      <App>
        <Header />
      </App>,
      { store }
    )

    userEvent.click(getByTestId('cart-link'))
    expect(container.innerHTML).not.toMatch('Все пиццы')

    userEvent.click(getByTestId('catalog-link'))
    expect(container.innerHTML).toMatch('Все пиццы')
  })
})
