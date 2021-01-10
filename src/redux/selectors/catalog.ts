import { createSelector } from 'reselect'

import { RootState } from '../reducers'

const getItems = (state: RootState) => state.catalog.items
export const selectItems = createSelector(getItems, (items) => items)

const getStatus = (state: RootState) => state.catalog.status
export const selectStatus = createSelector(getStatus, (status) => status)
