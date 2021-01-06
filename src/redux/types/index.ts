export type {
  cartActionsType,
  ICartItemsValue,
  ICartItems,
  ICartItem,
} from './cart'
export type { catalogActionsType } from './catalog'
export type { filtersActionsType, ISortBy } from './filters'

export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U
}
  ? U
  : never
