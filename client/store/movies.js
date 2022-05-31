import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_MOVIES = 'SET_MOVIES'
const FIND_SINGLE_MOVIE = 'FIND_SINGLE_MOVIE'

/**
 * ACTION CREATORS
 */


/**
 * THUNK CREATORS
 */
export const loadMovies = (page=1)=>{
  return async(dispatch) => {
    const movies = (await axios.get(`/api/movies/page/${page}`)).data
    dispatch({
      type:SET_MOVIES,
      movies
    })
  }
}

export const findSingleMovie = (id)=>{
  return async(dispatch)=>{
    const movie = (await axios.get(`/api/movies/movie/${id}`)).data
    dispatch({
      type:FIND_SINGLE_MOVIE,
      movie
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
    case FIND_SINGLE_MOVIE:
      return action.movie
    default:
      return state
  }
}