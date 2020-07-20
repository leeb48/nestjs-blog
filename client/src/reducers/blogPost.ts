//---------------------------------------------------------------------

import { BlogPostAction, BlogPostActionTypes } from '../actions';

// BLOGPOST STATE
export interface BlogPost {
  id: number;
  username: string;
  title: string;
  content: string;
  datePosted: string;
}

export interface BlogPostState {
  posts: BlogPost[];
  post: BlogPost | null;
  loading: boolean;
}

const initalState: BlogPostState = {
  posts: [],
  post: null,
  loading: true,
};

//---------------------------------------------------------------------
// BLOGPOST REDUCER
export const blogPost = (
  state: BlogPostState = initalState,
  action: BlogPostAction
) => {
  switch (action.type) {
    case BlogPostActionTypes.searchBlogPost:
    case BlogPostActionTypes.getAllPosts:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };

    case BlogPostActionTypes.getBLogPostById:
      return {
        ...state,
        post: action.payload,
      };

    default:
      return state;
  }
};
