import { deliveryPizza, IItem } from './api'
import { ISortBy } from '../redux/types'

export const catalogApi = {
  getItems(category: number, sortBy: ISortBy) {
    return deliveryPizza
      .get<IItem[]>(
        `/pizzas?${category ? `category=${category}` : ''}&_sort=${
          sortBy.type
        }&_order=${sortBy.order}`
      )
      .then((res) => res.data)
  },
}
