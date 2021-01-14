import { IItem } from '../api/api'
import { ICartItems } from '../redux/types'

export const categoryNames = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]

export const filterNames = [
  { name: 'популярности', type: 'popular', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавиту', type: 'name', order: 'asc' },
]

export enum appStatuses {
  success = 'success',
  loading = 'loading',
  error = 'error',
}

export const availableTypes = ['тонкое', 'традиционное']
export const availableSizes = [26, 30, 40]

export const mockedState = {
  filters: {
    category: 0,
    sortBy: {
      type: 'popular',
      order: 'desc',
    },
  },
  catalog: {
    items: [
      {
        id: 0,
        imageUrl: 'some url',
        name: 'some name',
        types: [0, 1],
        sizes: [26, 30, 40],
        price: 803,
        category: 0,
        rating: 4,
      },
    ] as IItem[],
    status: appStatuses.success as string,
    error: '' as string,
  },
  cart: {
    items: {
      '0': {
        items: [
          {
            id: 0,
            name: 'pizza1',
            imageUrl: 'url1',
            price: 10,
            type: 'тонкое',
            size: 26,
          },
          {
            id: 0,
            name: 'pizza1',
            imageUrl: 'url1',
            price: 20,
            type: 'традиционное',
            size: 40,
          },
        ],
        totalItemPrice: 30,
      },
    } as ICartItems,
    totalPrice: 0,
    totalCount: 0,
  },
}
