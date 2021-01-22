import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import thunkMiddleware from 'redux-thunk'

import { Cart } from './Cart'
import { Provider } from 'react-redux'
import { StoreType } from '../app/store'
import userEvent from '@testing-library/user-event'
import { rootReducer } from '../redux/reducers'
import { applyMiddleware, compose, createStore } from 'redux'
import { addItemToCart, clearCart } from '../redux/reducers/cart'
import { BrowserRouter as Router } from 'react-router-dom'

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

const item = {
  id: 0,
  name: 'pizza1',
  imageUrl: 'url1',
  price: 10,
  type: 'тонкое',
  size: 26,
}

const initialAppState = {}

interface ITestRenderParams {
  store: StoreType
  otherOpts?: any[]
}

const testRender = (
  Component: React.ReactElement,
  { store, otherOpts = [] }: ITestRenderParams
) => {
  return render(
    <Router>
      <Provider store={store}>{Component}</Provider>
    </Router>,
    ...otherOpts
  )
}

const makeStore = () => {
  return createStore(
    rootReducer,
    initialAppState,
    compose(applyMiddleware(thunkMiddleware))
  )
}

const makeTestStore = () => {
  const testStore = makeStore()
  const origDispatch = testStore.dispatch
  testStore.dispatch = jest.fn(origDispatch)
  return testStore
}

describe('cart page render', () => {
  it('cart with item get loaded', async () => {
    const store = makeTestStore()
    store.dispatch(addItemToCart(item))

    const { queryByTestId } = testRender(<Cart />, { store })

    expect(queryByTestId('cart-item')).toBeDefined()
  })

  it('cart with item confirm clear cart', async () => {
    const store = makeTestStore()
    store.dispatch(addItemToCart(item))

    const { getByText } = testRender(<Cart />, { store })

    userEvent.click(getByText(/Очистить корзину/))
    expect(store.dispatch).toHaveBeenCalledWith(clearCart())
  })

  it('cart with item decrement item', async () => {
    const store = makeTestStore()
    store.dispatch(addItemToCart(item))

    const { getByText, getByTestId, queryByTestId } = testRender(<Cart />, {
      store,
    })

    expect(getByText(/1 шт/)).toBeInTheDocument()

    userEvent.click(getByTestId(/cart-item-row-remove/))
    expect(queryByTestId(/1 шт/)).not.toBeInTheDocument()
  })
})
