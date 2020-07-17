import axios from 'axios';
import { AuthActionTypes } from './types';
import { Dispatch } from 'react';

//---------------------------------------------------------------------
// INTERFACE

// Data Transfer Objects
export interface CreateUserDto {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  bio: string;
}

export interface GetUserDto {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  bio: string;
  dateRegistered: string;
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

export interface GetUserAction {
  type: AuthActionTypes.getUser;
  payload: GetUserDto;
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
    console.log(error.message);
    console.log(error.response.data);
  }
};

export const logoutUser = () => ({
  type: AuthActionTypes.logout,
});

export const getUser = () => async (dispatch: Dispatch<GetUserAction>) => {
  try {
    const res = await axios.get('/auth');

    dispatch({
      type: AuthActionTypes.getUser,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export type AuthAction =
  | RegisterUserAction
  | LoginUserAction
  | LogoutUserAction
  | GetUserAction;
