import { RootState } from '../reducers'
import { createSelector } from 'reselect'

const getItems = (state: RootState) => state.catalog.items
export const selectItems = createSelector(getItems, (items) => items)

const getStatus = (state: RootState) => state.catalog.status
export const selectStatus = createSelector(getStatus, (status) => status)
