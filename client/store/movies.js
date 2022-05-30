import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_MOVIES = 'SET_MOVIES'

/**
 * ACTION CREATORS
 */


/**
 * THUNK CREATORS
 */
export const loadMovies = (page=1)=>{
  return async(dispatch) => {
    const movies = (await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_KEY }&page=${page}`)).data
    dispatch({
      type:SET_MOVIES,
      movies
    })
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.movies
    default:
      return state
  }
}