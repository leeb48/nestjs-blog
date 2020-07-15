// Auth Types
export enum AuthActionTypes {
  register = 'REGISTER USER',
  login = 'LOGIN USER',
  logout = 'LOGOUT USER',
}
export interface User {
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  loading: boolean;
}
