import { useState } from 'react'

export const useSelectItem = () => {
  const [activeItem, setActiveItem] = useState<number>(0)

  const handleSelectItem = (index: number) => setActiveItem(index)

  return { activeItem, handleSelectItem }
}
