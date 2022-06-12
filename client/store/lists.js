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


export const loadWatchList = () => {
  return async(dispatch) => {
    const lists = (await axios.get('/api/watchlist')).data
    dispatch({type: SET_WATCHLIST, lists})
  }
}

export const createList = (list, mediaId) => {
  return async(dispatch) => {
    const newList = (await axios.post('/api/watchlist' , {list, mediaId})).data
    dispatch({type: ADD_WATCHLIST, list: newList})

  }
}



/**
 * REDUCER
 */

export default function(state = [], action) {
  switch(action.type) {
    case SET_WATCHLIST :
      return action.lists
    case ADD_WATCHLIST :
      
   
    default: 
      return state
  }
}
