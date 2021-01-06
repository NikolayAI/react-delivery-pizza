import { catalogActions } from '../actions'
import { InferActionsTypes } from './index'

export type catalogActionsType = InferActionsTypes<typeof catalogActions>
