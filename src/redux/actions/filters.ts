import { InferActionsTypes } from '../../utils/types/types'

export const filtersActions = {
  setSortBy: (name: string) => ({ type: 'SET_SORT_BY', payload: name } as const),
  setCategory: (catIndex: number) =>
    ({ type: 'SET_CATEGORY', payload: catIndex } as const),
}

export type filtersActionsType = InferActionsTypes<typeof filtersActions>
