import { getCategory, getSortBy, selectCategory, selectSortBy } from './filters'
import { mockedState } from '../../constants'

const filtersState = {
  category: 0,
  sortBy: {
    type: 'popular',
    order: 'desc',
  },
}

describe('getCategory', () => {
  test('should return filters category', () => {
    expect(getCategory(mockedState)).toEqual(filtersState.category)
  })
})

describe('selectCategory', () => {
  test('should return selected filters items', () => {
    const selectedFiltersCategory = selectCategory(mockedState)
    expect(selectedFiltersCategory).toEqual(filtersState.category)
  })
})

describe('getSortBy', () => {
  test('should return filters sortBy', () => {
    expect(getSortBy(mockedState)).toEqual(filtersState.sortBy)
  })
})

describe('selectSortBy', () => {
  test('should return selected filters status', () => {
    const selectedFiltersSortBy = selectSortBy(mockedState)
    expect(selectedFiltersSortBy).toEqual(filtersState.sortBy)
  })
})
