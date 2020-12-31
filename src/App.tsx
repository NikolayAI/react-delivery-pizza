import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './scss/app.scss'
import { Cart, Catalog } from './pages'
import { Header } from './components'

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
