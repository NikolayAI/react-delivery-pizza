import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Header } from '../components'
import { Cart, Catalog } from '../pages'
import '../assets/scss/app.scss'
import { useSelector } from 'react-redux'
import { selectCart } from '../redux/selectors'

export const App: React.FC = () => {
  const { totalPrice, totalCount, items } = useSelector(selectCart)

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Switch>
          <Route exact path='/'>
            <Catalog />
          </Route>
          <Route exact path='/cart'>
            <Cart
              totalPrice={totalPrice}
              totalCount={totalCount}
              items={items}
            />
          </Route>
        </Switch>
      </div>
    </div>
  )
}
