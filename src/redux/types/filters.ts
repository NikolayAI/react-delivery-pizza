import { filtersActions } from '../actions'
import { InferActionsTypes } from './index'

export type filtersActionsType = InferActionsTypes<typeof filtersActions>

export interface ISortBy {
  type: string
  order: string
}
