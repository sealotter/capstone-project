import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_USERS = 'SET_USERS'

/**
 * ACTION CREATORS
 */


/**
 * THUNK CREATORS
 */
export const loadUsers = ()=>{
  // const user = store.getState()
  // console.log(user)
  return async(dispatch) => {
    const users = (await axios.get(`/api/users`)).data
    dispatch({
      type:SET_USERS,
      users
    })
  }
}


/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users
    default:
      return state
  }
}