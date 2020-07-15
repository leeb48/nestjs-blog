import { AuthActionTypes, AuthState } from '../actions/types';
import { AuthAction } from '../actions';

const initialState: AuthState = {
  isAuthenticated: false,
  token: localStorage.getItem('token'),
  user: null,
  loading: true,
};

export default function (state = initialState, action: AuthAction) {
  switch (action.type) {
    case AuthActionTypes.register:
      return state;
  }
}
