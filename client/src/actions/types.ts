// Auth Types
export enum AuthActionTypes {
  register,
  login,
  logout,
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
