import {
  cart,
  addItemToCart,
  increaseCartItem,
  decreaseCartItem,
  clearCart,
  removeCartItemRow,
} from './cart'
import { ICartItems } from '../types'

let startState = {
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
    '1': {
      items: [
        {
          id: 1,
          name: 'pizza2',
          imageUrl: 'url2',
          price: 20,
          type: 'традиционное',
          size: 26,
        },
      ],
      totalItemPrice: 20,
    },
  } as ICartItems,
  totalPrice: 50,
  totalCount: 3,
}

const cartItem = {
  id: 0,
  name: 'pizza1',
  imageUrl: 'url1',
  price: 15,
  type: 'тонкое',
  size: 30,
}

beforeEach(() => {
  startState = {
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
      '1': {
        items: [
          {
            id: 1,
            name: 'pizza2',
            imageUrl: 'url2',
            price: 20,
            type: 'традиционное',
            size: 26,
          },
        ],
        totalItemPrice: 20,
      },
    } as ICartItems,
    totalPrice: 50,
    totalCount: 3,
  }
})

describe('item should be added in cart', () => {
  const endState = cart(startState, addItemToCart(cartItem))
  it('should change items length and price', () => {
    expect(endState.items[cartItem.id].items.length).toEqual(3)
    expect(endState.items[cartItem.id].items[2].price).toEqual(15)
  })

  it('should change state totalCount and totalPrice', () => {
    expect(endState.totalCount).toEqual(4)
    expect(endState.totalPrice).toEqual(65)
  })
})

describe('correct cart item should be increase', () => {
  const endState = cart(startState, increaseCartItem(1))
  it('correct cart item should be increase', () => {
    expect(endState.items[cartItem.id].items.length).toEqual(2)
    expect(endState.items[1].items.length).toEqual(2)
    expect(endState.totalPrice).toEqual(70)
  })
})

test('correct cart item should be decrease', () => {
  const endState = cart(startState, decreaseCartItem(0))

  expect(endState.items[cartItem.id].items.length).toEqual(1)
  expect(endState.items[1].items.length).toEqual(1)
  expect(endState.totalCount).toEqual(2)
})

test('correct cart item should be removed', () => {
  const endState = cart(startState, removeCartItemRow(0))

  expect(endState.items[0]).not.toBeDefined()
  expect(endState.totalCount).toEqual(1)
})

test('cart should be cleared', () => {
  const endState = cart(startState, clearCart())

  expect(endState.items).toStrictEqual({})
  expect(endState.totalCount).toEqual(0)
})
