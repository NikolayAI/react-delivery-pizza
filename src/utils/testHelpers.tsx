import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { StoreType } from '../app/store'
import { rootReducer } from '../redux/reducers'

export interface ITestRenderParams {
  store: StoreType
  otherOpts?: any[]
}

export const makeStore = (initialAppState = {}) => {
  return createStore(
    rootReducer,
    initialAppState,
    compose(applyMiddleware(thunkMiddleware))
  )
}
export const makeTestStore = () => {
  const testStore = makeStore()
  const origDispatch = testStore.dispatch
  testStore.dispatch = jest.fn(origDispatch)
  return testStore
}
export const testRender = (
  Component: React.ReactElement,
  { store, otherOpts = [] }: ITestRenderParams
) => {
  return render(
    <Router>
      <Provider store={store}>{Component}</Provider>
    </Router>,
    ...otherOpts
  )
}
