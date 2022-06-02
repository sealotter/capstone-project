import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_TV_GENRES = 'SET_TV_GENRES'
const SET_MOVIE_GENRES = 'SET_MOVIE_GENRES'

/**
 * ACTION CREATORS
 */


/**
 * THUNK CREATORS
 */
export const loadGenres = ()=>{
  return async(dispatch) => {
    const tvGenres = (await axios.get(`/api/media/genres/tv`)).data.genres
    const movieGenres = (await axios.get(`/api/media/genres/movie`)).data.genres
    dispatch({
      type:SET_TV_GENRES,
      tvGenres
    })
    dispatch({
      type:SET_MOVIE_GENRES,
      movieGenres
    })
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_TV_GENRES:
      return {...state, tvGenres:action.tvGenres}
    case SET_MOVIE_GENRES:
      return {...state, movieGenres:action.movieGenres}
    default:
      return state
  }
}