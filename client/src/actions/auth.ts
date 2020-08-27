import { blogApi as axios } from "../utils/axiosConfig";
import { AuthActionTypes } from "./types";
import { Dispatch } from "react";
import { setAlert } from "./alert";
import { BlogPost } from "../reducers/blogPost";

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
  blogPostsFromUser: BlogPost[];
  dateRegistered: string;
}

export interface LoginUserDto {
  username: string;
  password: string;
}

export interface EditBioDto {
  bio: string;
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

export interface EditBioAction {
  type: AuthActionTypes.editBio;
}

export interface LogoutUserAction {
  type: AuthActionTypes.logout;
}

export interface GetUserAction {
  type: AuthActionTypes.getUser;
  payload: GetUserDto;
}

export type AuthAction =
  | RegisterUserAction
  | LoginUserAction
  | LogoutUserAction
  | GetUserAction
  | EditBioAction;

//---------------------------------------------------------------------
// ACTION CREATORS

export const editBio = (editBioDto: EditBioDto) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.patch("/auth/editbio", editBioDto, config);

    dispatch({ type: AuthActionTypes.editBio });
    dispatch(setAlert({ msg: "Bio edited", type: "success" }));
  } catch (error) {
    console.log(error.message);

    const errors: string[] = error.response.data.message;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert({ msg: error, type: "danger" }))
      );
    }
  }
};

export const registerUser = (userData: CreateUserDto) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/auth/register", userData, config);

    dispatch({
      type: AuthActionTypes.register,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);

    const errors: string[] = error.response.data.message;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert({ msg: error, type: "danger" }))
      );
    }
  }
};

export const loginUser = (userData: LoginUserDto) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/auth/login", userData, config);

    dispatch({
      type: AuthActionTypes.login,
      payload: res.data,
    });

    dispatch(setAlert({ msg: "Login Successful", type: "success" }));
  } catch (error) {
    console.log(error.message);

    const errors: string[] = error.response.data.message;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert({ msg: error, type: "danger" }))
      );
    }
  }
};

export const logoutUser = () => ({
  type: AuthActionTypes.logout,
});

export const getUser = (showAlert: boolean = true) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const res = await axios.get("/auth");

    dispatch({
      type: AuthActionTypes.getUser,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);

    const errors: string[] = error.response.data.message;

    if (showAlert) {
      if (errors) {
        errors.forEach((error) =>
          dispatch(setAlert({ msg: error, type: "danger" }))
        );
      }
    }
  }
};

//---------------------------------------------------------------------
// Utility Functions
