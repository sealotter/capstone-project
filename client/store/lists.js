import axios from 'axios';
import history from 'history';



const TOKEN = 'token';

/**
 * ACTION TYPES
 */

const SET_WATCHLIST = 'SET_WATCHLIST'
const ADD_WATCHLIST = 'ADD_WATCHLIST'
const REMOVE_WATCHLIST = 'REMOVE_WATCHLIST'


/**
 * THUNK CREATORS
 */


export const loadWatchList = () => {
 const token = window.localStorage.getItem(TOKEN)
 if(token) {
    return async(dispatch) => {
      const lists = (await axios.get('/api/watchlist',
      {
        headers: {
          authorization: token
        }
      })).data

      dispatch({type: SET_WATCHLIST, lists})
    }
    
  }
  
 
}

export const createList = (list, mediaId, authId) => {
  return async(dispatch) => {
    const newList = (await axios.post('/api/watchlist' , {mediaId, authId})).data
    dispatch({type: ADD_WATCHLIST, list: newList})

  }
}

export const removeWList = (list) => {
  return async(dispatch) => {
   await axios.delete(`/api/watchlist/${list.id}`).data
    dispatch({type: REMOVE_WATCHLIST, list})
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
      return [...state, action.list]
    case REMOVE_WATCHLIST : 
      return state.filter((list) => list.id !== action.list.id)
      
    default: 
      return state
  }
}
