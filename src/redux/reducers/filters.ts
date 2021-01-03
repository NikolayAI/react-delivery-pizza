import { filtersActionsType } from '../actions/filters'

const initialState = {
  category: 0,
  sortBy: {
    type: 'popular',
    order: 'desc',
  },
}

export const filters = (state = initialState, action: filtersActionsType) => {
  switch (action.type) {
    case 'SET_SORT_BY':
      return {
        ...state,
        sortBy: action.payload,
      }
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.payload,
      }
    default:
      return state
  }
}

export interface ISortBy {
  type: string
  order: string
}
