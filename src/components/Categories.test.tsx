import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { Categories } from './Categories'
import { categoryNames } from '../constants'
import { setCategory } from '../redux/actions'
import { makeTestStore, testRender } from '../utils/testHelpers'

describe('category render', () => {
  it('should render with active category', async () => {
    const store = makeTestStore()

    const { getByText } = testRender(
      <Categories items={categoryNames} activeCategory={0} />,
      { store }
    )

    expect(getByText('Все')).toHaveClass('active')
    expect(getByText('Мясные')).not.toHaveClass('active')
  })

  it('click on category should run action', async () => {
    const store = makeTestStore()

    const { getByText } = testRender(
      <Categories items={categoryNames} activeCategory={0} />,
      { store }
    )

    userEvent.click(getByText('Мясные'))
    expect(store.dispatch).toHaveBeenCalledWith(setCategory(1))
  })

  it('should render with another select category', async () => {
    const store = makeTestStore()

    const { getByText } = testRender(
      <Categories items={categoryNames} activeCategory={1} />,
      { store }
    )

    expect(getByText('Все')).not.toHaveClass('active')
    expect(getByText('Мясные')).toHaveClass('active')
  })
})
