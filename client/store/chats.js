import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_CHATS = 'SET_CHATS';
const UPDATE_CHATS = 'UPDATE_CHATS';

/**
 * ACTION CREATORS
 */

/**
 * THUNK CREATORS
 */
export const loadChats = () => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    return async (dispatch) => {
      const chats = (await axios.get('/api/chats',{
        headers: {
          authorization: token
        }
      })).data;
      dispatch({
        type: SET_CHATS,
        chats
      });
    };
  }
};

export const updateChat = (chat, otherUser) => {
  const token = window.localStorage.getItem(TOKEN)
  const {id} = otherUser
  if (token) {
    return async (dispatch) => {
      let updatedChat = (await axios.put('/api/chats',{
        authorization: token,
        chat,
        id
      })).data;
      dispatch({
        type: UPDATE_CHATS,
        chat:updatedChat
      });
    };
  }
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_CHATS:
      return action.chats;
    case UPDATE_CHATS:
      const exists = state.find(item=> item.id === action.chat.id)
      if(exists) return state.map(item => item.id === action.chat.id? action.chat: item)
      return [...state, action.chat]
    default:
      return state;
  }
}