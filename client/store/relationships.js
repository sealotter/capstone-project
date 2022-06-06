import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_RELATIONSHIPS = 'SET_RELATIONSHIPS';
const ADD_FRIEND = 'ADD_FRIEND';
const ACCEPT_FRIEND = 'ACCEPT_FRIEND';

/**
 * ACTION CREATORS
 */

/**
 * THUNK CREATORS
 */
export const loadRelationships = () => {
  // const user = store.getState()
  // console.log(user)
  return async (dispatch) => {
    const relationships = (await axios.get(`/api/relationships`)).data;
    dispatch({
      type: SET_RELATIONSHIPS,
      relationships,
    });
  };
};
export const addFriend = (senderId, recipientId) => {
  console.log('addFriend thunk');
  return async (dispatch) => {
    const requestResponse = await axios.post(`/api/relationships/addfriend`, {
      senderId,
      recipientId,
    });
    const request = requestResponse.data;
    dispatch({
      type: ADD_FRIEND,
      request,
    });
  };
};

export const acceptFriend = (senderId, recipientId) => {
  console.log('accept friend thunk');
  return async (dispatch) => {
    const requestResponse = await axios.post(
      '/api/relationships/acceptfriend',
      {
        senderId,
        recipientId,
      }
    );
    const request = requestResponse.data;
    dispatch({
      type: ACCEPT_FRIEND,
      request,
    });
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_RELATIONSHIPS:
      return action.relationships;
    case ADD_FRIEND:
      return action.request;
    case ACCEPT_FRIEND:
      return action.request;
    default:
      return state;
  }
}
