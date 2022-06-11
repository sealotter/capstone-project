import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */

const LOAD_DB_MEDIA = 'LOAD_DB_MEDIA';

/**
 * ACTION CREATORS
 */

/**
 * THUNK CREATORS
 */

export const loadDBMedia = () => {
  return async (dispatch) => {
    const DBMedia = (await axios.get('/api/media')).data;
    dispatch({
      type: LOAD_DB_MEDIA,
      DBMedia,
    });
  };
};
/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case LOAD_DB_MEDIA:
      return action.DBMedia;
    default:
      return state;
  }
}
