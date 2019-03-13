import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';
import categories from './categories'
import user from './user';
import posts from './posts';

export default combineReducers({
  categories,
  user,
  posts,
  toastr: toastrReducer
});
