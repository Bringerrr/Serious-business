import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import imdbReducer from './imdbReducer';
import userReducer from './userReducer';
import reviewReducer from './reviewReducer';

export default combineReducers({
  imdb: imdbReducer,
  item: itemReducer,
  user: userReducer,
  review: reviewReducer,
});
