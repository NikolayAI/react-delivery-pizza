import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { makeTestStore, testRender } from '../utils/testHelpers'
import { productCardItem } from '../utils/testFixstures'
import { ProductCard } from './ProductCard'

describe('product card render', () => {
  it('should click on select type', async () => {
    const store = makeTestStore()
    const handleClickAddItemToCart = jest.fn()

    const { getByText } = testRender(
      <ProductCard
        {...productCardItem}
        onClickAddItemToCart={handleClickAddItemToCart}
        itemCountInCart={1}
      />,
      { store }
    )

    expect(getByText('тонкое')).toHaveClass('active')
    expect(getByText('традиционное')).not.toHaveClass('active')

    userEvent.click(getByText('традиционное'))

    expect(getByText('тонкое')).not.toHaveClass('active')
    expect(getByText('традиционное')).toHaveClass('active')

    handleClickAddItemToCart.mockClear()
  })

  it('should click on select size', async () => {
    const store = makeTestStore()
    const handleClickAddItemToCart = jest.fn()

    const { getByText } = testRender(
      <ProductCard
        {...productCardItem}
        onClickAddItemToCart={handleClickAddItemToCart}
        itemCountInCart={1}
      />,
      { store }
    )

    expect(getByText(/26 см/)).toHaveClass('active')
    expect(getByText(/40 см/)).not.toHaveClass('active')

    userEvent.click(getByText(/40 см/))

    expect(getByText(/26 см/)).not.toHaveClass('active')
    expect(getByText(/40 см/)).toHaveClass('active')

    handleClickAddItemToCart.mockClear()
  })
})
