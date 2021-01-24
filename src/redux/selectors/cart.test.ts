import { getCart, getCartItems, selectCart, selectCartItems } from './cart'
import { ICartItems } from '../types'
import { mockedState } from '../../utils/testFixstures'

const cartState = {
  items: {
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
        {
          id: 0,
          name: 'pizza1',
          imageUrl: 'url1',
          price: 20,
          type: 'традиционное',
          size: 40,
        },
      ],
      totalItemPrice: 30,
    },
  } as ICartItems,
  totalPrice: 0,
  totalCount: 0,
}

describe('getCart', () => {
  test('should return cart state', () => {
    expect(getCart(mockedState)).toEqual(cartState)
  })
})

describe('selectCart', () => {
  test('should return selected cart state', () => {
    const selectedCart = selectCart(mockedState)
    expect(selectedCart).toEqual(cartState)
  })
})

describe('getCartItems', () => {
  test('should return cart items', () => {
    expect(getCartItems(mockedState)).toEqual(cartState.items)
  })
})

describe('selectCartItems', () => {
  test('should return selected cart items', () => {
    const selectedCartItems = selectCartItems(mockedState)
    expect(selectedCartItems).toEqual(cartState.items)
  })
})
