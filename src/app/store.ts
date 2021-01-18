import { configureStore } from '@reduxjs/toolkit'
import throttle from 'lodash.throttle'

import { rootReducer } from '../redux/reducers'
import { loadState, saveState } from '../utils/localStorage'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: loadState(),
})

store.subscribe(
  throttle(() => {
    saveState({ cart: store.getState().cart })
  }, 1000)
)

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
