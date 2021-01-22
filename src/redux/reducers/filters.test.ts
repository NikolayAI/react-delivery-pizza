import { filters, setCategory, setSortBy } from './filters'

let startState = {
  category: 0,
  sortBy: {
    type: 'popular',
    order: 'desc',
  },
}

beforeEach(() => {
  startState = {
    category: 0,
    sortBy: {
      type: 'popular',
      order: 'desc',
    },
  }
})

describe('should set sortBy properties', () => {
  const sortBy = {
    type: 'price',
    order: 'asc',
  }

  const endState = filters(startState, setSortBy(sortBy))

  it('sortBy type should be changed', () => {
    expect(endState.sortBy.type).toEqual('price')
  })

  it('sortBy order should be changed', () => {
    expect(endState.sortBy.order).toEqual('asc')
  })
})

describe('should set category', () => {
  const endState = filters(startState, setCategory(1))

  it('category should be changed', () => {
    expect(endState.category).toEqual(1)
  })
})
