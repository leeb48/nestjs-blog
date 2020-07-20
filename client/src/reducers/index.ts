import { combineReducers } from 'redux';
import { auth } from './auth';
import { alert } from './alert';
import { blogPost } from './blogPost';
import { AppState } from '../store';

export default combineReducers<AppState>({
  auth,
  blogPost,
  alert,
});
