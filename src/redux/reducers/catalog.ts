import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { appStatuses } from '../../constants'
import { IItem } from '../../api/api'
import { IFetchItemsParam, IRejectValue, IThunkError } from '../types/catalog'
import { catalogApi } from '../../api'

export const fetchItems = createAsyncThunk<
  IItem[],
  IFetchItemsParam,
  IThunkError
>('catalog/fetchItems', async (param, { rejectWithValue, signal }) => {
  const { category, sortBy } = param
  const source = axios.CancelToken.source()
  signal.addEventListener('abort', () => {
    source.cancel()
  })
  try {
    return await catalogApi.getItems(category, sortBy, source)
  } catch (err) {
    const error: IRejectValue & AxiosError = err
    if (!error) {
      throw err
    }
    return rejectWithValue(error)
  } finally {
    signal.removeEventListener('abort', () => {
      source.cancel()
    })
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
      .addCase(fetchItems.rejected, (state, { error }) => {
        state.status = appStatuses.error
        state.error = error.message ? error.message : 'Internal server error'
      }),
})

export const catalog = catalogSlice.reducer
