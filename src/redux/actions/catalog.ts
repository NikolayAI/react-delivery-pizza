import { catalogApi } from '../../api'
import { Dispatch } from 'redux'
import { appStatuses } from '../../constants'
import { IItem } from '../../api/api'
import { ISortBy } from '../types'

export const catalogActions = {
  setItems: (items: IItem[]) =>
    ({ type: 'SET_ITEMS', payload: items } as const),
  setStatus: (status: string) =>
    ({ type: 'SET_STATUS', payload: status } as const),
}

export const fetchItems = (
  category: number = 0,
  sortBy: ISortBy = {
    type: '',
    order: '',
  }
) => async (dispatch: Dispatch) => {
  try {
    dispatch(catalogActions.setStatus(appStatuses.loading))
    const items = await catalogApi.getItems(category, sortBy)
    dispatch(catalogActions.setItems(items))
  } catch (err) {
    console.log(err)
    dispatch(catalogActions.setStatus(appStatuses.error))
  }
}
