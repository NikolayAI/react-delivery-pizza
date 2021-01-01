import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import './scss/app.scss'
import { Cart, Catalog } from './pages'
import { Header } from './components'
import axios from 'axios'

export interface IItem {
  id: number
  imageUrl: string
  name: string
  types: number[]
  sizes: number[]
  price: number
  category: number
  rating: number
}

interface IApiGetItems {
  pizzas: IItem[]
}

export const App: React.FC = () => {
  const [items, setItems] = useState<IItem[]>([])

  useEffect(() => {
    axios
      .get<IApiGetItems>('http://localhost:3000/db.json')
      .then(({ data }) => setItems(data.pizzas))
  }, [])

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Switch>
          <Route exact path='/'>
            <Catalog items={items} />
          </Route>
          <Route exact path='/cart'>
            <Cart />
          </Route>
        </Switch>
      </div>
    </div>
  )
}
