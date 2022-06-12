import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_RELATIONSHIPS = 'SET_RELATIONSHIPS';
const ADD_FRIEND = 'ADD_FRIEND';
const UPDATE_FRIEND = 'UPDATE_FRIEND';

/**
 * ACTION CREATORS
 */

/**
 * THUNK CREATORS
 */
export const loadRelationships = () => {
  // const user = store.getState()
  // console.log(user)
  const token = window.localStorage.getItem('token');
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

export const updateRelationship = (senderId, recipientId, acceptDecline) => {
  return async (dispatch) => {
    console.log('here');
    const requestResponse = await axios.put(
      `/api/relationships/updateRelationship`,
      {
        senderId,
        recipientId,
        acceptDecline,
      }
    );
    const request = {
      response: requestResponse.data,
      senderId,
      recipientId,
    };

    dispatch({
      type: UPDATE_FRIEND,
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
      return [...state, action.request];
    case UPDATE_FRIEND:
      if (action.request.response)
        return state.map((rel) =>
          rel.id === action.request.response.id ? action.request.response : rel
        );
      return state.filter(
        (rel) =>
          rel.senderId !== action.request.senderId &&
          rel.recipientId !== action.request.recipientId
      );
    default:
      return state;
  }
}
