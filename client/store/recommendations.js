import axios from 'axios';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SEND_REQUEST = 'SEND_REQUEST';
const SET_RECOMMENDATIONS = 'SET_RECOMMENDATIONS'

/**
 * ACTION CREATORS
 */

/**
 * THUNK CREATORS
 */

 export const loadRecommendations = () => {
  return async (dispatch) => {
    const recommendations = (await axios.get('/api/recommendations')).data;
    dispatch({
      type: SET_RECOMMENDATIONS,
      recommendations,
    });
  };
};

export const sendRec = (friendId, userId, mediaId) => {
  return async (dispatch) => {
    const rec = (
      await axios.post(`/api/recommendations`, {
        friendId,
        userId,
        mediaId,
      })
    ).data;
    dispatch({
      type: SEND_REQUEST,
      rec,
    });
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_RECOMMENDATIONS:
      return action.recommendations
    case SEND_REQUEST:
      return [...state, action.rec];
    default:
      return state;
  }
}
