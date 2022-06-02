import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_POSTS = 'SET_POSTS'
const CREATE_POST = 'CREATE_POST'

/**
 * ACTION CREATORS
 */


/**
 * THUNK CREATORS
 */
export const loadPosts = ()=>{
  return async(dispatch) => {
    const posts = (await axios.get('/api/posts')).data
    dispatch({
      type:SET_POSTS,
      posts
    })
  }
}

/**
 * REDUCER
 */
 export default function(state = [], action) {
  switch (action.type) {
    case SET_POSTS:
      return action.posts
    default:
      return state
  }
}