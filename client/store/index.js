import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import movies from './movies'
import relationships from './relationships'
import users from './users'
import posts from './posts'

const reducer = combineReducers({ auth, movies, relationships, users, posts })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './movies'
export * from './relationships'
export * from './users'
export * from './posts'
