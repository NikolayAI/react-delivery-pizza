import React, { useEffect, useRef, useState } from 'react'
import { useSelectItem } from '../../utils/hooks/useSelectItem'
import { useDispatch, useSelector } from 'react-redux'
import { selectCategory, selectSortBy } from '../../redux/selectors/filters'
import { filtersActions } from '../../redux/actions/filters'

const filterNames = [
  { name: 'популярности', type: 'popular' },
  { name: 'цене', type: 'price' },
  { name: 'алфавиту', type: 'alphabet' },
]

export const SortPopup: React.FC = React.memo(() => {
  const dispatch = useDispatch()
  const [visiblePopup, setVisiblePopup] = useState<boolean>(false)
  const activeSortBy = useSelector(selectSortBy)

  const sort = useRef<HTMLDivElement>(null)
  const activeSortTitle = filterNames[activeSortBy].name

  const toggleVisiblePopup = () => setVisiblePopup(!visiblePopup)
  const handleClickOutsidePopup = (e: MouseEvent) => {
    if (sort.current) {
      if (!e.composedPath().includes(sort.current)) setVisiblePopup(false)
    }
  }
  const handleSelectOption = (index: number) => {
    // dispatch(filtersActions.setSortBy(index))
    setVisiblePopup(false)
  }

  useEffect(() => {
    document.body.addEventListener('click', handleClickOutsidePopup)
    return () => document.body.removeEventListener('click', handleClickOutsidePopup)
  }, [])

  return (
    <div className='sort' ref={sort}>
      <div className='sort__label'>
        <svg
          className={visiblePopup ? 'rotated' : ''}
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445
            5.43945C9.69075 5.56315 9.54427 5.625 9.375
            5.625H0.625C0.455729 5.625 0.309245 5.56315
            0.185547 5.43945C0.061849 5.31576 0 5.16927 0
            5C0 4.83073 0.061849 4.68424 0.185547
            4.56055L4.56055 0.185547C4.68424 0.061849
            4.83073 0 5 0C5.16927 0 5.31576 0.061849
            5.43945 0.185547L9.81445 4.56055C9.93815
            4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={toggleVisiblePopup}>{activeSortTitle}</span>
      </div>
      {visiblePopup && (
        <div className='sort__popup'>
          <ul>
            {filterNames.map((item, i) => (
              <li
                key={`${item.type}_${i}`}
                className={activeSortBy === i ? 'active' : ''}
                onClick={() => handleSelectOption(i)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
})
