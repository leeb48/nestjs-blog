import { combineReducers } from 'redux';
import { auth } from './auth';
import { AppState } from '../store';

export default combineReducers<AppState>({
  auth,
});
