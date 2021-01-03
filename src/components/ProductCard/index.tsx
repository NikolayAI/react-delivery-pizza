import classNames from 'classnames'
import React from 'react'
import { useSelectItem } from '../../utils/hooks/useSelectItem'
import { IItem } from '../../api/catalogApi'
import { AddToCartButton } from '../AddToCartButton'
import { ICartItem } from '../../redux/actions/cart'

interface IProductCard extends IItem {
  onClickAddItemToCart: (item: ICartItem) => void
  itemCountInCart: number
}

export const ProductCard: React.FC<IProductCard> = React.memo(
  ({
    id,
    imageUrl,
    name,
    price,
    types,
    sizes,
    onClickAddItemToCart,
    itemCountInCart,
  }) => {
    const availableTypes = ['тонкое', 'традиционное']
    const availableSizes = [26, 30, 40]

    const { activeItem: activeType, handleSelectItem: handleSelectType } = useSelectItem(
      types[0]
    )

    const { activeItem: activeSize, handleSelectItem: handleSelectSize } = useSelectItem(
      availableSizes.indexOf(sizes[0])
    )

    const handleClickAddItem = () => {
      const item = {
        id,
        name,
        imageUrl,
        price,
        type: availableTypes[activeType],
        size: availableSizes[activeSize],
      }
      onClickAddItemToCart(item)
    }

    return (
      <div className='pizza-block'>
        <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
        <h4 className='pizza-block__title'>{name}</h4>
        <div className='pizza-block__selector'>
          <ul>
            {availableTypes.map((type, i) => (
              <li
                key={type}
                className={classNames({
                  active: activeType === i,
                  disabled: !types.includes(i),
                })}
                onClick={() => handleSelectType(i)}
              >
                {type}
              </li>
            ))}
          </ul>
          <ul>
            {availableSizes.map((size, i) => (
              <li
                key={size}
                className={classNames({
                  active: activeSize === i,
                  disabled: !sizes.includes(size),
                })}
                onClick={() => handleSelectSize(i)}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>от {price} ₽</div>
          <AddToCartButton
            onClickAddItemToCart={handleClickAddItem}
            itemCountInCart={itemCountInCart}
          />
        </div>
      </div>
    )
  }
)
