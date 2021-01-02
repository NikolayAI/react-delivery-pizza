import React from 'react'
import { CatalogLoader, Categories, ProductCard, SortPopup } from '../../components'
import { useSelector } from 'react-redux'
import { selectItems, selectStatus } from '../../redux/selectors/catalog'
import { appStatuses } from '../../utils/types/types'

export const Catalog: React.FC = () => {
  const items = useSelector(selectItems)
  const status = useSelector(selectStatus)
  console.log('catalog')

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <SortPopup />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {status === appStatuses.success
          ? items.map((item) => <ProductCard key={item.id} {...item} />)
          : Array(12).map((_, i) => <CatalogLoader key={i} />)}
      </div>
    </div>
  )
}
