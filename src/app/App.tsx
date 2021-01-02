import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import '../scss/app.scss'
import { Cart, Catalog } from '../pages'
import { Header } from '../components'
import { useDispatch } from 'react-redux'
import { fetchItems } from '../redux/actions/catalog'

export const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

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
