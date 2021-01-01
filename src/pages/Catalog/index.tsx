import React from 'react'
import { Categories, ProductCard, SortPopup } from '../../components'
import { IItem } from '../../App'

interface ICatalog {
  items: IItem[]
}

export const Catalog: React.FC<ICatalog> = ({ items }) => {
  console.log(items)

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          items={['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']}
        />
        <SortPopup items={['популярности', 'цене', 'алфавиту']} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {items.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}
