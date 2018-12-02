import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import imdbReducer from './imdbReducer';
import userReducer from './userReducer';

export default combineReducers({
  imdb: imdbReducer,
  item: itemReducer,
  user: userReducer
});
