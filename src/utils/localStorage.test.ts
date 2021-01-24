import { loadState } from './localStorage'

describe('load localstorage', () => {
  it('calling loadState should return value', () => {
    JSON.parse = jest.fn()
    window.localStorage.setItem('deliveryPizzaCart', 'test localstorage')

    loadState()

    expect(JSON.parse).toHaveBeenCalledWith(
      window.localStorage.getItem('deliveryPizzaCart')
    )

    window.localStorage.clear()
    jest.clearAllMocks()
  })
})
