import { combineReducers } from 'redux'

import { filters } from './filters'
import { catalog } from './catalog'
import { cart } from './cart'

export const rootReducer = combineReducers({
  cart,
  filters,
  catalog,
})

export type RootState = ReturnType<typeof rootReducer>
