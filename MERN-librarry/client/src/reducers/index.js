import { combineReducers } from 'redux';
import activityReducer from './activityReducer';
import imdbReducer from './imdbReducer';
import userReducer from './userReducer';

export default combineReducers({
  imdb: imdbReducer,
  activity: activityReducer,
  user: userReducer
});
