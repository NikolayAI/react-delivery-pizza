import { applyMiddleware, compose, createStore } from 'redux'
import { rootReducer } from '../redux/reducers'
import thunkMiddleware from 'redux-thunk'

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
