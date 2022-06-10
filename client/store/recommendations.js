import axios from 'axios';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SEND_REQUEST = 'SEND_REQUEST';

/**
 * ACTION CREATORS
 */

/**
 * THUNK CREATORS
 */
export const sendRec = (senderId, recipientId, mediaId) => {
  return async (dispatch) => {
    const rec = (await axios.post(`/api/recommendations`),
    {
      senderId,
      recipientId,
      mediaId,
    }).data;
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
    case SEND_REQUEST:
      return action.rec;
    default:
      return state;
  }
}
