import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'
const UPDATE_PROFILE = 'UPDATE_PROFILE'

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})
const updateAuth = (updatedUser) => ({ type: UPDATE_PROFILE, updatedUser });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}

export const authenticate = (username, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

export const updateProfile = (user) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const updatedUser = (
      await axios.put("/auth/me", user, {
        headers: {
          authorization: token,
        },
      })
    ).data;
    dispatch(updateAuth(updatedUser));
    dispatch({
      type:'UPDATE_USERS',
      user:updatedUser
    })
  };
};

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    case UPDATE_PROFILE:
      return action.updatedUser
    default:
      return state
  }
}
