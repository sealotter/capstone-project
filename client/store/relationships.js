import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_RELATIONSHIPS = 'SET_RELATIONSHIPS'

/**
 * ACTION CREATORS
 */


/**
 * THUNK CREATORS
 */
export const loadRelationships = ()=>{
  // const user = store.getState()
  // console.log(user)
  return async(dispatch) => {
    const relationships = (await axios.get(`/api/relationships`)).data
    dispatch({
      type:SET_RELATIONSHIPS,
      relationships
    })
  }
}


/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case SET_RELATIONSHIPS:
      return action.relationships
    default:
      return state
  }
}