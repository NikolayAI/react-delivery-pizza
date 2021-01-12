import { catalog, fetchItems } from './catalog'
import { IItem } from '../../api/api'
import { catalogApi } from '../../api'
import { appStatuses } from '../../constants'

jest.mock('../../api/catalogApi')
const catalogApiMock = catalogApi as jest.Mocked<typeof catalogApi>
const dispatch = jest.fn()
const getState = jest.fn()

afterEach(() => {
  catalogApiMock.getItems.mockClear()
})

const result: IItem[] = [
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

let startState = {
  items: [] as IItem[],
  status: appStatuses.success as string,
  error: '' as string,
}

const items = [
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

const thunkArgs = {
  category: 0,
  sortBy: {
    type: 'тонкое',
    order: 'desc',
  },
}

beforeEach(() => {
  startState = {
    items: [] as IItem[],
    status: appStatuses.success as string,
    error: '' as string,
  }
})

describe('fetchItems thunk succeeded', () => {
  beforeEach(() => {
    catalogApiMock.getItems.mockResolvedValue(result)
  })
  test('fetchItems should return value', async () => {
    const action = await fetchItems(thunkArgs)(dispatch, getState, {})

    expect(dispatch).toBeCalledTimes(2)
    expect(dispatch).toHaveBeenLastCalledWith(
      fetchItems.fulfilled(items, action.meta.requestId, thunkArgs)
    )
  })
})

describe('fetchItems thunk error without value', () => {
  beforeEach(() => {
    catalogApiMock.getItems.mockRejectedValue(null)
  })
  test('fetchItems error should not return value', async () => {
    const action = await fetchItems(thunkArgs)(dispatch, getState, {})

    expect(dispatch).toBeCalledTimes(2)
    expect(dispatch).toHaveBeenLastCalledWith(
      fetchItems.rejected(null, action.meta.requestId, thunkArgs)
    )
  })
})

describe('fetchItems thunk error with value', () => {
  const error = {
    name: 'error',
    message: 'error message',
    response: {
      data: 'Rejected value',
    },
  }
  beforeEach(() => {
    catalogApiMock.getItems.mockRejectedValue(error)
  })
  test('fetchItems should return value', async () => {
    await fetchItems(thunkArgs)(dispatch, getState, {})

    expect(dispatch.mock.calls.length).toBe(2)
  })
})

describe('when request is pending', () => {
  const action = fetchItems.pending('requestId', thunkArgs)

  const endState = catalog(startState, action)

  test('status should be changed', () => {
    expect(endState.status).toEqual(appStatuses.loading)
  })

  test('items should not to be defined', () => {
    expect(endState.items.length).toEqual(0)
  })
})

describe('when request is succeeded', () => {
  const action = fetchItems.fulfilled(items, 'requestId', thunkArgs)

  const endState = catalog(startState, action)

  test('status should be changed', () => {
    expect(endState.status).toEqual(appStatuses.success)
  })

  test('items should be set into the state', () => {
    expect(endState.items.length).toEqual(2)
  })
})

describe('when request is error without value', () => {
  const action = fetchItems.rejected(null, 'requestId', thunkArgs)

  const endState = catalog(startState, action)

  test('status should be changed', () => {
    expect(endState.status).toEqual(appStatuses.error)
  })

  test('should set error', () => {
    expect(endState.error).toEqual('Rejected')
  })
})

describe('when request is error with value', () => {
  const error = {
    name: '',
    message: '',
  }

  const action = fetchItems.rejected(error, 'requestId', thunkArgs)

  const endState = catalog(startState, action)

  test('status should be changed', () => {
    expect(endState.status).toEqual(appStatuses.error)
  })

  test('should set error', () => {
    expect(endState.error).toEqual('Internal server error')
  })
})
