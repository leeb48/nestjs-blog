import axios from 'axios';
import { AuthActionTypes } from './types';
import { Dispatch } from 'react';

//---------------------------------------------------------------------
// INTERFACE

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  bio: string;
}

export interface LoginUserDto {
  username: string;
  password: string;
}

export interface Token {
  accessToken: string;
}

//  Action Types
export interface RegisterUserAction {
  type: AuthActionTypes.register;
  payload: Token;
}

export interface LoginUserAction {
  type: AuthActionTypes.login;
  payload: Token;
}

export interface LogoutUserAction {
  type: AuthActionTypes.logout;
}

//---------------------------------------------------------------------
// ACTION CREATORS

export const registerUser = (userData: CreateUserDto) => async (
  dispatch: Dispatch<RegisterUserAction>
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/auth/register', userData, config);

    dispatch({
      type: AuthActionTypes.register,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response.data);
    console.log(error.message);
  }
};

export const loginUser = (userData: LoginUserDto) => async (
  dispatch: Dispatch<LoginUserAction>
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/auth/login', userData, config);

    dispatch({
      type: AuthActionTypes.login,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const logoutUser = () => ({
  type: AuthActionTypes.logout,
});

export type AuthAction =
  | RegisterUserAction
  | LoginUserAction
  | LogoutUserAction;
