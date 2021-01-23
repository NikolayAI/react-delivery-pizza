import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { waitForElementToBeRemoved } from '@testing-library/react'

import { testRender } from '../utils/testHelpers'
import { Catalog } from './Catalog'
import { store } from '../app/store'

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
  it('catalog get loader', async () => {
    const { queryAllByTestId } = testRender(<Catalog />, { store })

    const loader = queryAllByTestId('catalog-loader')
    expect(loader[0]).toBeInTheDocument()

    await waitForElementToBeRemoved(loader)
  })

  it('catalog get data success', async () => {
    const { findByText } = testRender(<Catalog />, { store })
    const card = await findByText(`Пепперони Фреш с перцем`)

    expect(card).toBeInTheDocument()
  })

  it('click add to cart button', async () => {
    const { getByTestId } = testRender(<Catalog />, { store })

    userEvent.click(getByTestId('add-to-cart-button'))
  })
})
