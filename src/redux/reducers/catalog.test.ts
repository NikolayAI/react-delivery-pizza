import { catalog, fetchItems } from './catalog'
import { IItem } from '../../api/api'
import { catalogApi } from '../../api'
import { appStatuses } from '../../constants'
import {
  catalogItems,
  catalogResponseData,
  catalogThunkArgs,
} from '../../utils/testFixstures'

jest.mock('../../api/catalogApi')
const catalogApiMock = catalogApi as jest.Mocked<typeof catalogApi>
const dispatch = jest.fn()
const getState = jest.fn()

afterEach(() => {
  catalogApiMock.getItems.mockClear()
})

let startState = {
  items: [] as IItem[],
  status: appStatuses.success as string,
  error: '' as string,
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
    catalogApiMock.getItems.mockResolvedValue(catalogResponseData)
  })
  it('fetchItems should return value', async () => {
    const action = await fetchItems(catalogThunkArgs)(dispatch, getState, {})

    expect(dispatch).toBeCalledTimes(2)
    expect(dispatch).toHaveBeenLastCalledWith(
      fetchItems.fulfilled(
        catalogItems,
        action.meta.requestId,
        catalogThunkArgs
      )
    )
  })
})

describe('fetchItems thunk error without value', () => {
  beforeEach(() => {
    catalogApiMock.getItems.mockRejectedValue(null)
  })
  it('fetchItems error should not return value', async () => {
    const action = await fetchItems(catalogThunkArgs)(dispatch, getState, {})

    expect(dispatch).toBeCalledTimes(2)
    expect(dispatch).toHaveBeenLastCalledWith(
      fetchItems.rejected(null, action.meta.requestId, catalogThunkArgs)
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
  it('fetchItems should return value', async () => {
    await fetchItems(catalogThunkArgs)(dispatch, getState, {})

    expect(dispatch.mock.calls.length).toBe(2)
  })
})

describe('when request is pending', () => {
  const action = fetchItems.pending('requestId', catalogThunkArgs)

  const endState = catalog(startState, action)

  it('status should be changed', () => {
    expect(endState.status).toEqual(appStatuses.loading)
  })

  it('items should not to be defined', () => {
    expect(endState.items.length).toEqual(0)
  })
})

describe('when request is succeeded', () => {
  const action = fetchItems.fulfilled(
    catalogItems,
    'requestId',
    catalogThunkArgs
  )

  const endState = catalog(startState, action)

  it('status should be changed', () => {
    expect(endState.status).toEqual(appStatuses.success)
  })

  it('items should be set into the state', () => {
    expect(endState.items.length).toEqual(2)
  })
})

describe('when request is error without value', () => {
  const action = fetchItems.rejected(null, 'requestId', catalogThunkArgs)

  const endState = catalog(startState, action)

  it('status should be changed', () => {
    expect(endState.status).toEqual(appStatuses.error)
  })

  it('should set error', () => {
    expect(endState.error).toEqual('Rejected')
  })
})

describe('when request is error with value', () => {
  const error = {
    name: '',
    message: '',
  }

  const action = fetchItems.rejected(error, 'requestId', catalogThunkArgs)

  const endState = catalog(startState, action)

  it('status should be changed', () => {
    expect(endState.status).toEqual(appStatuses.error)
  })

  it('should set error', () => {
    expect(endState.error).toEqual('Internal server error')
  })
})
