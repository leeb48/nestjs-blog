import axios, { AxiosResponse } from 'axios';
import { BlogPostActionTypes } from './types';
import { Dispatch } from 'react';
import { setAlert } from './alert';
import { BlogPost } from '../reducers/blogPost';

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
export interface BlogPostSearchAction {
  type: BlogPostActionTypes.searchBlogPost;
  payload: BlogPost[];
}

export interface GetAllBlogPostsAction {
  type: BlogPostActionTypes.getAllPosts;
  payload: BlogPost[];
}

export interface GetBlogPostByIdAciton {
  type: BlogPostActionTypes.getBLogPostById;
  payload: BlogPost;
}

export type BlogPostAction =
  | GetAllBlogPostsAction
  | BlogPostSearchAction
  | GetBlogPostByIdAciton;

//---------------------------------------------------------------------
// ACTION CREATORS

export const getBlogPostWithQuery = (query: GetPostQuery) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const { search, postId } = query;

    let res: AxiosResponse;

    if (search) {
      res = await axios.get(`/blogpost?search=${search}`);

      dispatch({
        type: BlogPostActionTypes.searchBlogPost,
        payload: res.data,
      });

      return;
    }

    if (postId) {
      res = await axios.get(`/blogpost/${postId}`);

      dispatch({
        type: BlogPostActionTypes.getBLogPostById,
        payload: res.data,
      });

      return;
    }

    res = await axios.get('/blogpost');

    dispatch({
      type: BlogPostActionTypes.getAllPosts,
      payload: res.data,
    });
  } catch (error) {}
};

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
