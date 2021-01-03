import axios from 'axios'

export const deliveryPizza = axios.create({
  baseURL: 'http://localhost:3001',
})
