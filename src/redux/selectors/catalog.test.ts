import { IItem } from '../../api/api'
import { appStatuses, mockedState } from '../../constants'
import { getItems, getStatus, selectItems, selectStatus } from './catalog'

const catalogState = {
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
}

describe('getItems', () => {
  test('should return catalog items', () => {
    expect(getItems(mockedState)).toEqual(catalogState.items)
  })
})

describe('selectItems', () => {
  test('should return selected catalog items', () => {
    const selectedCatalogItems = selectItems(mockedState)
    expect(selectedCatalogItems).toEqual(catalogState.items)
  })
})

describe('getStatus', () => {
  test('should return catalog status', () => {
    expect(getStatus(mockedState)).toEqual(catalogState.status)
  })
})

describe('selectStatus', () => {
  test('should return selected catalog status', () => {
    const selectedCatalogStatus = selectStatus(mockedState)
    expect(selectedCatalogStatus).toEqual(catalogState.status)
  })
})
