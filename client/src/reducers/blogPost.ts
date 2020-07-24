//---------------------------------------------------------------------

import { BlogPostAction, BlogPostActionTypes } from '../actions';

// BLOGPOST STATE
export interface BlogPost {
  id: number;
  username: string;
  title: string;
  content: string;
  datePosted: string;
  postComments: PostComment[];
}

export interface PostComment {
  id: number;
  content: string;
  username: string;
}

export interface BlogPostState {
  posts: BlogPost[];
  post: BlogPost;
  loading: boolean;
}

const initalState: BlogPostState = {
  posts: [],
  post: {
    content: '',
    datePosted: '',
    id: 0,
    postComments: [],
    title: '',
    username: '',
  },
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

    case BlogPostActionTypes.addComment:
      return {
        ...state,
        post: { ...state.post, postComments: action.payload },
      };

    case BlogPostActionTypes.removePost:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };

    default:
      return state;
  }
};
