import { cartActionsType, ICartItem } from '../actions/cart'
import {
  generateNewItem,
  removeCartItemRowFlow,
} from '../../utils/reducers/cart'

const initialState = {
  items: {} as ICartItems,
  totalPrice: 0,
  totalCount: 0,
}

export const cart = (state = initialState, action: cartActionsType) => {
  switch (action.type) {
    case 'ADD_ITEM_TO_CART': {
      const currentItem = state.items[action.payload.id]
        ? [...state.items[action.payload.id].items, action.payload]
        : [action.payload]

      return generateNewItem(state, action.payload.id, currentItem)
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: {},
        totalPrice: 0,
        totalCount: 0,
      }
    }

    case 'REMOVE_CART_ITEM_ROW': {
      return removeCartItemRowFlow(state, action)
    }

    case 'INCREASE_CART_ITEM': {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ]

      return generateNewItem(state, action.payload, newObjItems)
    }

    case 'DECREASE_CART_ITEM': {
      const oldItems = state.items[action.payload].items
      const newObjItems =
        oldItems.length > 0
          ? state.items[action.payload].items.slice(1)
          : oldItems

      if (newObjItems.length < 1) {
        return removeCartItemRowFlow(state, action)
      }

      return generateNewItem(state, action.payload, newObjItems)
    }

    default:
      return state
  }
}

export interface ICartItemsValue {
  items: ICartItem[]
  totalItemPrice: number
}

export interface ICartItems {
  [key: string]: ICartItemsValue
}
