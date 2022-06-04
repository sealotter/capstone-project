import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_MEDIA = 'SET_MEDIA'
const FIND_SINGLE_MEDIA = 'FIND_SINGLE_MEDIA'

/**
 * ACTION CREATORS
 */


/**
 * THUNK CREATORS
 */
export const loadMedia = (search={ page:1, media:'movie'})=>{
  return async(dispatch) => {
    const media = (await axios.get(`/api/media/page/${search.page}`, {
      headers: {
        search:JSON.stringify(search)
      }
    })).data
    dispatch({
      type:SET_MEDIA,
      media
    })
  }
}

export const findSingleMedia = (search={id:id, media:'movie'})=>{
  return async(dispatch)=>{
    const media = (await axios.get(`/api/media/${search.id}`, {
      headers: {
        search:JSON.stringify(search)
      }
    })).data
    dispatch({
      type:FIND_SINGLE_MEDIA,
      media
    })
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_MEDIA:
      return action.media
    case FIND_SINGLE_MEDIA:
      return action.media
    default:
      return state
  }
}