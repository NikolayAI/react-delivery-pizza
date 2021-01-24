import '@testing-library/jest-dom'

import { cartItem, cartItem1 } from '../../utils/testFixstures'
import { ICartItems } from '../types'
import {
  addItemToCart,
  cart,
  clearCart,
  decreaseCartItem,
  increaseCartItem,
  removeCartItemRow,
} from './cart'

let cartStartState = {
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

beforeEach(() => {
  cartStartState = {
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

describe('first item should be added in cart', () => {
  const endState = cart(cartStartState, addItemToCart(cartItem1))

  it('should add first item with key 2', () => {
    expect(endState.items[cartItem1.id]).toBeDefined()
    expect(endState.items[cartItem1.id].items[0].name).toEqual('pizza3')
    expect(endState.items[cartItem1.id].totalItemPrice).toEqual(10)
  })
})

describe('second item should be added in cart', () => {
  const endState = cart(cartStartState, addItemToCart(cartItem))

  it('should add first item with key 1', () => {
    expect(endState.items[cartItem.id].items.length).toEqual(3)
    expect(endState.items[cartItem.id].items[2].price).toEqual(15)
  })

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
  const endState = cart(cartStartState, increaseCartItem(1))

  it('should increase correct item', () => {
    expect(endState.items[cartItem.id].items.length).toEqual(2)
    expect(endState.items[1].items.length).toEqual(2)
  })

  it('should increase totalPrice', () => {
    expect(endState.totalPrice).toEqual(70)
  })
})

describe('correct cart item should be decrease', () => {
  const endState = cart(cartStartState, decreaseCartItem(0))

  it('should decrease correct item', () => {
    expect(endState.items[cartItem.id].items.length).toEqual(1)
    expect(endState.items[1].items.length).toEqual(1)
  })

  it('should decrease totalCount', () => {
    expect(endState.totalCount).toEqual(2)
  })
})

describe('correct cart item should be removed, when item count equal 1', () => {
  const endState = cart(cartStartState, decreaseCartItem(1))

  it('should removed correct item after decrease', () => {
    expect(endState.items[cartItem.id].items.length).toEqual(2)
    expect(endState.items[1]).not.toBeDefined()
  })
})

describe('cart item should be removed', () => {
  const endState = cart(cartStartState, removeCartItemRow(0))

  it('correct cart item should be removed', () => {
    expect(endState.items[0]).not.toBeDefined()
    expect(endState.totalCount).toEqual(1)
  })
})

describe('cart should be cleared', () => {
  const endState = cart(cartStartState, clearCart())

  it('cart should be cleared', () => {
    expect(endState.items).toStrictEqual({})
    expect(endState.totalCount).toEqual(0)
  })
})
