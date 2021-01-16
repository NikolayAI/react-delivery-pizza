import React from 'react'
import { Provider } from 'react-redux'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

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

test('catalog get loader', async () => {
  render(
    <Provider store={store}>
      <Catalog />
    </Provider>
  )

  const loader = screen.getAllByTestId('catalog-loader')

  expect(loader).toBeDefined()
})

test('catalog get data success', async () => {
  render(
    <Provider store={store}>
      <Catalog />
    </Provider>
  )

  const card = await waitFor(() => screen.getByText('Пепперони Фреш с перцем'))

  expect(card).toBeDefined()
})

test('click add to cart button', async () => {
  render(
    <Provider store={store}>
      <Catalog />
    </Provider>
  )

  fireEvent.click(screen.getByTestId('add-to-cart-button'))
})
