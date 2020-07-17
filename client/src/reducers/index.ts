import { combineReducers } from 'redux';
import { auth } from './auth';
import { alert } from './alert';
import { AppState } from '../store';

export default combineReducers<AppState>({
  auth,
  alert,
});
