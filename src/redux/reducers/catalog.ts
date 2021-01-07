import { appStatuses } from '../../constants'
import { IItem } from '../../api/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IFetchItemsParam, IThunkError } from '../types/catalog'
import { catalogApi } from '../../api'
import { AxiosError } from 'axios'

export const fetchItems = createAsyncThunk<
  IItem[],
  IFetchItemsParam,
  IThunkError
>('catalog/fetchItems', async (param, { rejectWithValue }) => {
  const { category, sortBy } = param
  try {
    return await catalogApi.getItems(category, sortBy)
  } catch (err) {
    let error: AxiosError = err
    return rejectWithValue({ errors: [error.message], fieldsErrors: undefined })
  }
})

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    items: [] as IItem[],
    status: appStatuses.success as string,
    error: '' as string,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = appStatuses.loading
      })
      .addCase(fetchItems.fulfilled, (state, { payload }) => {
        state.items = payload
        state.status = appStatuses.success
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = appStatuses.error
        if (action.payload) {
          state.error = action.payload.errors[0]
        } else {
          state.error = action.error.message || 'Some error'
        }
      }),
})

export const catalog = catalogSlice.reducer
