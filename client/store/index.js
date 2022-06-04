import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import media from './media'
import relationships from './relationships'
import users from './users'

import posts from './posts'



import genres from './genres'

const reducer = combineReducers({ auth, media, relationships, users, posts, genres })

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './media'
export * from './relationships'
export * from './users'
export * from './posts'
export * from './genres'

