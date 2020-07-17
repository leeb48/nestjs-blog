import { AuthActionTypes } from '../actions/types';
import { AuthAction } from '../actions';
import { setAuthToken } from '../utils/axiosConfig';

//---------------------------------------------------------------------
// AUTH STATE
export interface User {
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  dateRegistered: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: localStorage.getItem('token'),
  user: null,
  loading: true,
};

//---------------------------------------------------------------------
// REDUCER
export const auth = (state: AuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.register:
    case AuthActionTypes.login:
      localStorage.setItem('token', action.payload.accessToken);

      // Set global authorization token for axios
      setAuthToken(localStorage.token);
      return {
        ...state,
        isAuthenticated: true,
        token: localStorage.getItem('token'),
        loading: false,
      };

    case AuthActionTypes.getUser:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };

    case AuthActionTypes.logout:
      localStorage.setItem('token', '');

      // Set global authorization token for axios
      setAuthToken(localStorage.token);
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
