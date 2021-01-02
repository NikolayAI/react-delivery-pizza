import axios from 'axios'

export const catalogApi = {
  getItems() {
    return axios.get<IItem[]>('http://localhost:3001/pizzas').then((res) => res.data)
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
