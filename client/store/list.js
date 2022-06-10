import axios from 'axios';
import history from 'history';



const TOKEN = 'token';

/**
 * ACTION TYPES
 */

const SET_WATCHLIST = 'SET_WATCHLIST'
const ADD_WATCHLIST = 'ADD_WATCHLIST'


/**
 * THUNK CREATORS
 */


export const loadWatchList = (media) => {
  return async(dispatch) => {
    const watchlist = (await axios.get('/api/watchlist')).data
    dispatch({type: SET_WATCHLIST, watchlist})
  }
}

export const createList = (watchlist, mediaId) => {
  return async(dispatch) => {
    const newList = (await axios.post('/api/watchlist' , {watchlist, mediaId}))
    dispatch({type: ADD_WATCHLIST, list: newList})

  }
}



/**
 * REDUCER
 */

export default function(state = [], action) {
  console.log(action.type)
  switch(action.type) {
    case SET_WATCHLIST :
      return action.watchlist
    case ADD_WATCHLIST :
      const findMedia = state.find((m => m.id === action.watchlist.id))
      return [...state, findMedia]
      
   
      default: 
      return state
  }
}
