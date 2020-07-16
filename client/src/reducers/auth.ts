import { AuthActionTypes, AuthState } from '../actions/types';
import { AuthAction } from '../actions';

const initialState: AuthState = {
  isAuthenticated: false,
  token: localStorage.getItem('token'),
  user: null,
  loading: true,
};

export const auth = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.register:
    case AuthActionTypes.login:
      localStorage.setItem('token', action.payload.accessToken);
      return {
        ...state,
        isAuthenticated: true,
        token: localStorage.getItem('token'),
        loading: false,
      };

    case AuthActionTypes.logout:
      localStorage.setItem('token', '');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        loading: false,
      };

    default:
      return state;
  }
};
