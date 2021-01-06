import React from 'react'
import { useDispatch } from 'react-redux'
import { filtersActions } from '../redux/actions'

interface ICategories {
  items: string[]
  activeCategory: number
}

export const Categories: React.FC<ICategories> = React.memo(
  ({ items, activeCategory }) => {
    const dispatch = useDispatch()

    const handleSelectCategories = (i: number) => {
      dispatch(filtersActions.setCategory(i))
    }

    return (
      <div className='categories'>
        <ul>
          {items.map((title, i) => (
            <li
              key={`${title}_${i}`}
              className={activeCategory === i ? 'active' : ''}
              onClick={() => handleSelectCategories(i)}
            >
              {title}
            </li>
          ))}
        </ul>
      </div>
    )
  }
)
