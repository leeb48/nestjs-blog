import axios from 'axios';
import { BlogPostActionTypes } from './types';
import { Dispatch } from 'react';
import { setAlert } from './alert';

//---------------------------------------------------------------------
// INTERFACES

// Data Transfer Objects
export interface CreatePostDto {
  title: string;
  content: string;
}

export interface GetPostQuery {
  search?: string;
  postId?: number;
}

// Action Types
export interface CreatePostAction {
  type: BlogPostActionTypes.createPost;
  payload: boolean;
}

//---------------------------------------------------------------------
// ACTION CREATORS

export const createPost = (newPostData: CreatePostDto, history: any) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.post('/blogpost', newPostData, config);

    dispatch(setAlert({ msg: 'Post Created', type: 'success' }));

    history.push('/');
  } catch (error) {
    console.log(error.message);

    const errors: string[] = error.response.data.message;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert({ msg: error, type: 'danger' }))
      );
    }
  }
};
