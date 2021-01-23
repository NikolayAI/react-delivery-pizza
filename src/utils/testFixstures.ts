import { IItem } from '../api/api'
import { ICartItems } from '../redux/types'
import { appStatuses } from '../constants'

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

export const catalogItems = [
  {
    id: 0,
    imageUrl:
      'https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg',
    name: 'Пепперони Фреш с перцем',
    types: [0, 1],
    sizes: [26, 30, 40],
    price: 803,
    category: 0,
    rating: 4,
  },
  {
    id: 1,
    imageUrl:
      'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg',
    name: 'Сырная',
    types: [0],
    sizes: [26, 40],
    price: 245,
    category: 1,
    rating: 6,
  },
]

export const catalogResponseData: IItem[] = [
  {
    id: 0,
    imageUrl:
      'https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg',
    name: 'Пепперони Фреш с перцем',
    types: [0, 1],
    sizes: [26, 30, 40],
    price: 803,
    category: 0,
    rating: 4,
  },
  {
    id: 1,
    imageUrl:
      'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg',
    name: 'Сырная',
    types: [0],
    sizes: [26, 40],
    price: 245,
    category: 1,
    rating: 6,
  },
]

export const catalogThunkArgs = {
  category: 0,
  sortBy: {
    type: 'тонкое',
    order: 'desc',
  },
}

export const cartItem = {
  id: 0,
  name: 'pizza1',
  imageUrl: 'url1',
  price: 10,
  type: 'тонкое',
  size: 26,
}

export const cartItems = {
  '0': {
    items: [cartItem],
    totalItemPrice: 10,
  },
}
