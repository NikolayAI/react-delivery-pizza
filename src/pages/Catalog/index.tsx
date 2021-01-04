import React, { useEffect } from 'react'
import {
  CatalogLoader,
  Categories,
  ProductCard,
  SortPopup,
} from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { selectItems, selectStatus } from '../../redux/selectors/catalog'
import { selectCategory, selectSortBy } from '../../redux/selectors/filters'
import { fetchItems } from '../../redux/actions/catalog'
import { cartActions, ICartItem } from '../../redux/actions/cart'
import { selectCartItems } from '../../redux/selectors/cart'
import {
  appStatuses,
  categoryNames,
  filterNames,
} from '../../variables/constats'

export const Catalog: React.FC = () => {
  const dispatch = useDispatch()
  const catalogItems = useSelector(selectItems)
  const cartItems = useSelector(selectCartItems)
  const status = useSelector(selectStatus)
  const activeCategory = useSelector(selectCategory)
  const activeSortBy = useSelector(selectSortBy)

  useEffect(() => {
    dispatch(fetchItems(activeCategory, activeSortBy))
  }, [dispatch, activeCategory, activeSortBy])

  const handleClickAddItemToCart = (item: ICartItem) => {
    dispatch(cartActions.addItemToCart(item))
  }

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories items={categoryNames} activeCategory={activeCategory} />
        <SortPopup items={filterNames} activeSortBy={activeSortBy.type} />
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
