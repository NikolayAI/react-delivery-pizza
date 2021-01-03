import { InferActionsTypes } from '../../utils/types/types'
import { ISortBy } from '../reducers/filters'

export const filtersActions = {
  setSortBy: (item: ISortBy) => ({ type: 'SET_SORT_BY', payload: item } as const),
  setCategory: (catIndex: number) =>
    ({ type: 'SET_CATEGORY', payload: catIndex } as const),
}

export type filtersActionsType = InferActionsTypes<typeof filtersActions>
