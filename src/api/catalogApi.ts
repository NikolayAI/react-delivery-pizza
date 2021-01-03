import { ISortBy } from '../redux/reducers/filters'
import { deliveryPizza } from './api'

export const catalogApi = {
  getItems(category: number, sortBy: ISortBy) {
    return deliveryPizza
      .get<IItem[]>(
        `/pizzas?${category ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${
          sortBy.order
        }`
      )
      .then((res) => res.data)
  },
}

export interface IItem {
  id: number
  imageUrl: string
  name: string
  types: number[]
  sizes: number[]
  price: number
  category: number
  rating: number
}

export interface IApiGetItems {
  pizzas: IItem[]
}
