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
        token: localStorage.getItem('token'),
      };

    default:
      return state;
  }
};
