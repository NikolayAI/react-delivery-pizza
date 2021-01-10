import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ISortBy } from '../types'

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    category: 0,
    sortBy: {
      type: 'popular',
      order: 'desc',
    },
  },
  reducers: {
    setSortBy(state, action: PayloadAction<ISortBy>) {
      state.sortBy = action.payload
    },
    setCategory(state, action: PayloadAction<number>) {
      state.category = action.payload
    },
  },
})

export const filters = filtersSlice.reducer
export const { setSortBy, setCategory } = filtersSlice.actions
