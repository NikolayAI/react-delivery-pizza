import { combineReducers } from 'redux'
import { filters } from './filters'
import { catalog } from './catalog'

export const rootReducer = combineReducers({
  filters,
  catalog,
})

export type RootState = ReturnType<typeof rootReducer>
