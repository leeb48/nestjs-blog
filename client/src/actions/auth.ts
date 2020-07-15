import axios from 'axios';
import { AuthActionTypes } from './types';
import { Dispatch } from 'react';

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  bio: string;
}

export interface RegisterUserAction {
  type: AuthActionTypes.register;
  payload: CreateUserDto;
}

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
  } catch (error) {
    console.log(error.message);
  }
};

export type AuthAction = RegisterUserAction;
