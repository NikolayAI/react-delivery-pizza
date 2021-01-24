import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { makeTestStore, testRender } from '../utils/testHelpers'
import { SortPopup } from './SortPopup'
import { filterNames } from '../constants'
import { setSortBy } from '../redux/reducers/filters'

describe('sort popup render', () => {
  it('should dispatch action', async () => {
    const store = makeTestStore()

    const { getByTestId, getByText } = testRender(
      <SortPopup items={filterNames} activeSortBy={'popular'} />,
      { store }
    )

    const popup = getByTestId('visible-sort-popup')
    expect(popup).toBeInTheDocument()
    expect(popup).toHaveTextContent('популярности')

    userEvent.click(popup)
    userEvent.click(getByText('цене'))

    expect(store.dispatch).toHaveBeenCalledWith(setSortBy(filterNames[1]))
  })

  it('should render with price sortBy', async () => {
    const store = makeTestStore()

    const { getByTestId } = testRender(
      <SortPopup items={filterNames} activeSortBy={'price'} />,
      { store }
    )

    expect(getByTestId('visible-sort-popup')).toHaveTextContent('цене')
  })
})
