import axios from 'axios'

export const deliveryPizza = axios.create({
  baseURL: 'http://localhost:3001',
})

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
