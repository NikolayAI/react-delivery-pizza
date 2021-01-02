import { appStatuses, InferActionsTypes } from '../../utils/types/types'
import { catalogApi, IItem } from '../../api/catalogApi'
import { Dispatch } from 'redux'

export const catalogActions = {
  setItems: (items: IItem[]) => ({ type: 'SET_ITEMS', payload: items } as const),
  setStatus: (status: string) => ({ type: 'SET_STATUS', payload: status } as const),
}

export const fetchItems = () => async (dispatch: Dispatch) => {
  try {
    dispatch(catalogActions.setStatus(appStatuses.loading))
    const items = await catalogApi.getItems()
    dispatch(catalogActions.setItems(items))
  } catch (err) {
    console.log(err)
    dispatch(catalogActions.setStatus(appStatuses.error))
  }
}

export type catalogActionsType = InferActionsTypes<typeof catalogActions>
