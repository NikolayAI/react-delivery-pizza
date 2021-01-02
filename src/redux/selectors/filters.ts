import { RootState } from '../reducers'
import { createSelector } from 'reselect'

const getCategory = (state: RootState) => state.filters.category
export const selectCategory = createSelector(getCategory, (category) => category)

const getSortBy = (state: RootState) => state.filters.sortBy
export const selectSortBy = createSelector(getSortBy, (sortBy) => sortBy)
