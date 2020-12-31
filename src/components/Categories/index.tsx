import React from 'react'
import { useSelectItem } from '../../utils/hooks/useSelectItem'

interface ICategories {
  items: string[]
}

export const Categories: React.FC<ICategories> = ({ items }) => {
  const { activeItem, handleSelectItem } = useSelectItem()

  return (
    <div className='categories'>
      <ul>
        {items.map((title, i) => (
          <li
            key={`${title}_${i}`}
            className={activeItem === i ? 'active' : ''}
            onClick={() => handleSelectItem(i)}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  )
}
