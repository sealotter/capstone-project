import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_RATING = 'SET_RATING'

/**
 * ACTION CREATORS
 */

const addRating = (rating)=>{
  type:SET_RATING,
  rating
}

/**
 * THUNK CREATORS
 */
 export const createRating = (rating, authId, mediaId)=>{
  return async(dispatch) => {
    const newRating = (await axios.post('/api/ratings', {rating, authId, mediaId})).data;
    dispatch({
      type:SET_RATING,
      newRating
    })
  }
}

// export const createPost = (content, username, avatarUrl) => {
//   return async (dispatch) => {
//     const post = (await axios.post('/api/posts/', {content, username, avatarUrl})).data;
//     dispatch({
//       type: CREATE_POST,
//       post,
//     });
//   };
// };

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case SET_RATING:
      return [...state, action.newRating]
    default:
      return state
  }
}