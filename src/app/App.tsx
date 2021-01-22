import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Header } from '../components'
import { Cart, Catalog } from '../pages'
import '../assets/scss/app.scss'

export const App: React.FC = () => {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Switch>
          <Route exact path='/'>
            <Catalog />
          </Route>
          <Route exact path='/cart'>
            <Cart />
          </Route>
        </Switch>
      </div>
    </div>
  )
}
