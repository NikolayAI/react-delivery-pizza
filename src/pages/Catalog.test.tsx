import React from 'react'
import { Provider } from 'react-redux'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom'
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'

import { store } from '../app/store'
import { Catalog } from './Catalog'

const items = [
  {
    id: 0,
    imageUrl:
      'https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg',
    name: 'Пепперони Фреш с перцем',
    types: [0, 1],
    sizes: [26, 30, 40],
    price: 803,
    category: 0,
    rating: 4,
  },
]

const handlers = [
  rest.get('http://localhost:3001/pizzas', (req, res, ctx) => {
    return res(ctx.json(items))
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('catalog page render', () => {
  test('catalog get loader', async () => {
    render(
      <Provider store={store}>
        <Catalog />
      </Provider>
    )

    const loader = await screen.findByTestId('catalog-loader')

    expect(loader).toBeInTheDocument()
    await waitForElementToBeRemoved(loader)
  })

  test('catalog get data success', async () => {
    render(
      <Provider store={store}>
        <Catalog />
      </Provider>
    )

    const card = await screen.findByText(`Пепперони Фреш с перцем`)

    expect(card).toBeInTheDocument()
  })

  test('click add to cart button', async () => {
    render(
      <Provider store={store}>
        <Catalog />
      </Provider>
    )

    fireEvent.click(screen.getByTestId('add-to-cart-button'))
  })
})
