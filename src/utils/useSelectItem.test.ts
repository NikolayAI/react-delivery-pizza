import { act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import { useSelectItem } from './useSelectItem'

describe('useLocalStorage hook', () => {
  it('should return correct values', () => {
    const { result } = renderHook(() => useSelectItem())

    expect(result.current.activeItem).toEqual(0)

    act(() => {
      result.current.handleSelectItem(1)
    })

    expect(result.current.activeItem).toEqual(1)
  })
})
