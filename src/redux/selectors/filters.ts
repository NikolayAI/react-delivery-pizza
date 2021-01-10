import { createSelector } from 'reselect'

import { RootState } from '../reducers'

const getCategory = (state: RootState) => state.filters.category
export const selectCategory = createSelector(
  getCategory,
  (category) => category
)

const getSortBy = (state: RootState) => state.filters.sortBy
export const selectSortBy = createSelector(getSortBy, (sortBy) => sortBy)
