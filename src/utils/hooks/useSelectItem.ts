import { useState } from 'react'

export const useSelectItem = (initialValue: number = 0) => {
  const [activeItem, setActiveItem] = useState<number>(initialValue)

  const handleSelectItem = (index: number) => setActiveItem(index)

  return { activeItem, handleSelectItem }
}
