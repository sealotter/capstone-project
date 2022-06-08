import axios from 'axios';
import history from 'history';


const TOKEN = 'token';

const LOAD_WATCHLIST = 'LOAD_WATCHLIST'
const SET_WATCHLIST = 'SET_WATCHLIST'


/**
 * THUNK CREATORS
 */

// export const loadWatchList = () => {
//   return async(dispatch) => {
//     const mediaWatch = (await axios.get(`/api/watch`)).data
//     dispatch({type: SET_WATCHLIST, mediaWatch})
   
//   }
// }

export const loadWatchList = (media) => {
  return async(dispatch) => {
    const watchlist = (await axios.get('/api/watchlist')).data
    dispatch({type: SET_WATCHLIST, watchlist})
  }
}



/**
 * REDUCER
 */
// export default function(state = {}, action) {
//   switch(action.type) {
//     case SET_WATCHLIST: 
//       return action.mediaWatch

//     default:
//       return state
//   }
// }



export default function(state = [], action) {
  switch(action.type) {
    case SET_WATCHLIST :
      return action.watchlist
    // case SET_WATCHLIST: 
    //   return [...state, action.media]
      default: 
      return state
  }
}
