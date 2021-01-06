import { ISortBy } from '../types'

export const filtersActions = {
  setSortBy: (item: ISortBy) =>
    ({ type: 'SET_SORT_BY', payload: item } as const),
  setCategory: (catIndex: number) =>
    ({ type: 'SET_CATEGORY', payload: catIndex } as const),
}
