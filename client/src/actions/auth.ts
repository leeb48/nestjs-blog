import axios from 'axios';
import { AuthActionTypes } from './types';
import { Dispatch } from 'react';
import { setAlert, AlertAction } from './alert';
import { SetAlertDto } from '../actions/alert';

//---------------------------------------------------------------------
// INTERFACES

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
  dispatch: Dispatch<RegisterUserAction | AlertAction>
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
    console.log(error.message);

    const errors: string[] = error.response.data.message;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert({ msg: error, type: 'warning' }))
      );
    }
  }
};

export const loginUser = (userData: LoginUserDto) => async (
  dispatch: Dispatch<LoginUserAction | AlertAction>
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

    dispatch(setAlert({ msg: 'Login Successful', type: 'success' }));
  } catch (error) {
    console.log(error.message);

    const errors: string[] = error.response.data.message;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert({ msg: error, type: 'warning' }))
      );
    }
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

//---------------------------------------------------------------------
// Utility Functions

export type AuthAction =
  | RegisterUserAction
  | LoginUserAction
  | LogoutUserAction
  | GetUserAction;
