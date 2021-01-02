import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filtersActions } from '../../redux/actions/filters'
import { selectCategory } from '../../redux/selectors/filters'

const categoryNames = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

export const Categories: React.FC = React.memo(() => {
  const dispatch = useDispatch()
  const activeCategory = useSelector(selectCategory)

  const handleSelectCategories = (i: number) => {
    dispatch(filtersActions.setCategory(i))
  }

  return (
    <div className='categories'>
      <ul>
        {categoryNames.map((title, i) => (
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
})
