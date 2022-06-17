import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_POSTS = 'SET_POSTS';
const CREATE_POST = 'CREATE_POST';
const UPDATE_POST = 'UPDATE_POST'

/**
 * ACTION CREATORS
 */

/**
 * THUNK CREATORS
 */
export const loadPosts = () => {
  return async (dispatch) => {
    const posts = (await axios.get('/api/posts')).data;
    dispatch({
      type: SET_POSTS,
      posts,
    });
  };
};

export const createPost = (content, userId, postId) => {
  return async (dispatch) => {
    const post = (await axios.post('/api/posts/', {content, userId, postId})).data;
    dispatch({
      type: CREATE_POST,
      post
    });
  };
};

export const updatePost = (postId, username) =>{
  return async(dispatch) =>{
    const updatedPost = (await axios.put('/api/posts', {postId, username})).data
    dispatch({
      type:UPDATE_POST,
      post:updatedPost
    })
  }
}

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;
    case CREATE_POST:
      return [...state, action.post];
    case UPDATE_POST:
      return state.map(post=>action.post.id === post.id?action.post:post)
    default:
      return state;
  }
}
