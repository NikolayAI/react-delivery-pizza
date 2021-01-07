import React, { useEffect } from 'react'
import {
  CatalogLoader,
  Categories,
  ProductCard,
  SortPopup,
} from '../components'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCartItems,
  selectCategory,
  selectItems,
  selectSortBy,
  selectStatus,
} from '../redux/selectors'
import { cartActions, fetchItems } from '../redux/actions'
import { appStatuses, categoryNames, filterNames } from '../constants'
import { ICartItem } from '../redux/types'

let cash = ''

export const Catalog: React.FC = () => {
  const dispatch = useDispatch()
  const catalogItems = useSelector(selectItems)
  const cartItems = useSelector(selectCartItems)
  const status = useSelector(selectStatus)
  const category = useSelector(selectCategory)
  const sortBy = useSelector(selectSortBy)

  useEffect(() => {
    if (cash === `${category}_${sortBy.type}_${sortBy.order}`) {
      return
    } else {
      cash = `${category}_${sortBy.type}_${sortBy.order}`
      dispatch(fetchItems({ category, sortBy }))
    }
  }, [dispatch, category, sortBy])

  const handleClickAddItemToCart = (item: ICartItem) => {
    dispatch(cartActions.addItemToCart(item))
  }

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories items={categoryNames} activeCategory={category} />
        <SortPopup items={filterNames} activeSortBy={sortBy.type} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {status === appStatuses.success
          ? catalogItems.map((item) => (
              <ProductCard
                key={item.id}
                {...item}
                onClickAddItemToCart={handleClickAddItemToCart}
                itemCountInCart={cartItems[item.id]?.items.length}
              />
            ))
          : Array(8)
              .fill(0)
              .map((_, i) => <CatalogLoader key={i} />)}
      </div>
    </div>
  )
}
