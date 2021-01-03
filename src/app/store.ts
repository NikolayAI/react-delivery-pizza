import { applyMiddleware, compose, createStore } from 'redux'
import { rootReducer } from '../redux/reducers'
import thunkMiddleware from 'redux-thunk'
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  compose(composeEnhancers(applyMiddleware(thunkMiddleware)))
)
