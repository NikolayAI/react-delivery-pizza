import { createSelector } from 'reselect'

import { RootState } from '../reducers'

export const getCategory = (state: RootState) => state.filters.category
export const selectCategory = createSelector(
  getCategory,
  (category) => category
)

export const getSortBy = (state: RootState) => state.filters.sortBy
export const selectSortBy = createSelector(getSortBy, (sortBy) => sortBy)
