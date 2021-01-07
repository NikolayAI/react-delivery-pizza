export type {
  cartActionsType,
  ICartItemsValue,
  ICartItems,
  ICartItem,
} from './cart'
export type { ISortBy } from './filters'

export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U
}
  ? U
  : never
