import { appStatuses } from '../../constants'
import { IItem } from '../../api/api'
import { catalogActionsType } from '../types'

const initialState = {
  items: [] as IItem[],
  status: appStatuses.success as string,
}

export const catalog = (state = initialState, action: catalogActionsType) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
        status: appStatuses.success,
      }
    case 'SET_STATUS':
      return {
        ...state,
        status: action.payload,
      }
    default:
      return state
  }
}
