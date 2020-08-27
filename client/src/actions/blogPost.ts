import { AxiosResponse } from "axios";
import { blogApi as axios } from "../utils/axiosConfig";
import { BlogPostActionTypes } from "./types";
import { Dispatch } from "react";
import { setAlert } from "./alert";
import { BlogPost, PostComment } from "../reducers/blogPost";

//---------------------------------------------------------------------
// INTERFACES

// Data Transfer Objects
export interface CreatePostDto {
  title: string;
  content: string;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
}

export interface CreateCommentDto {
  content: string;
}
export interface EditPostCommentDto {
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

export interface RemoveBlogPostAction {
  type: BlogPostActionTypes.removePost;
  payload: Number;
}

export interface UpdateBlogPostAction {
  type: BlogPostActionTypes.updatePost;
}

export interface AddCommentAction {
  type: BlogPostActionTypes.addComment;
  payload: PostComment[];
}

export interface EditCommentAction {
  type: BlogPostActionTypes.editComment;
}

export interface RemoveCommentAciton {
  type: BlogPostActionTypes.removeComment;
  payload: number;
}

export type BlogPostAction =
  | UpdateBlogPostAction
  | GetAllBlogPostsAction
  | BlogPostSearchAction
  | GetBlogPostByIdAciton
  | RemoveBlogPostAction
  | AddCommentAction
  | EditCommentAction
  | RemoveCommentAciton;

//---------------------------------------------------------------------
// ACTION CREATORS

// Comment Actions
export const removeComment = (commentId: number) => async (
  dispatch: Dispatch<any>
) => {
  try {
    await axios.delete(`/comment/${commentId}`);

    dispatch({ type: BlogPostActionTypes.removeComment, payload: commentId });
    dispatch(setAlert({ msg: "Comment Removed", type: "warning" }));
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

export const editComment = (
  editCommentDto: EditPostCommentDto,
  postId: number,
  commentId: number
) => async (dispatch: Dispatch<any>) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.patch(
      `/comment/${postId}/${commentId}`,
      editCommentDto,
      config
    );

    dispatch({ type: BlogPostActionTypes.editComment });

    dispatch(setAlert({ msg: "Comment Edited", type: "success" }));
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

export const createComment = (
  createCommentDto: CreateCommentDto,
  postId: number
) => async (dispatch: Dispatch<any>) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `/comment/${postId}`,
      createCommentDto,
      config
    );

    console.log(res.data);

    dispatch({
      type: BlogPostActionTypes.addComment,
      payload: res.data,
    });

    dispatch(setAlert({ msg: "Comment added", type: "success" }));
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

// BlogPost Actions
export const updateBlogPost = (
  updatePostDto: UpdatePostDto,
  postId: string
) => async (dispatch: Dispatch<any>) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.patch(`/blogpost/${postId}`, updatePostDto, config);

    dispatch({
      type: BlogPostActionTypes.updatePost,
    });

    dispatch(setAlert({ msg: "Post Updated", type: "success" }));
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

export const getBlogPostById = (postId: string) => async (
  dispatch: Dispatch<any>
) => {
  // Get a single post that matches the postId
  if (postId) {
    const res = await axios.get(`/blogpost/${postId}`);

    dispatch({
      type: BlogPostActionTypes.getBLogPostById,
      payload: res.data,
    });

    return;
  }
};

// Gets all blogposts including the comments
export const getAllBlogPosts = () => async (dispatch: Dispatch<any>) => {
  try {
    // Get all blogPosts
    const res = await axios.get("/blogpost/all");

    dispatch({
      type: BlogPostActionTypes.getAllPosts,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getBlogPostWithQuery = (query: GetPostQuery) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const { search } = query;

    let res: AxiosResponse;

    // Get all posts that meet the search criteria
    if (search) {
      res = await axios.get(`/blogpost?search=${search}`);

      dispatch({
        type: BlogPostActionTypes.searchBlogPost,
        payload: res.data,
      });

      return;
    }
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

export const createPost = (newPostData: CreatePostDto, history: any) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post("/blogpost", newPostData, config);

    dispatch(setAlert({ msg: "Post Created", type: "success" }));

    history.push("/");
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

export const removeBlogPost = (postId: number) => async (
  dispatch: Dispatch<any>
) => {
  try {
    await axios.delete(`/blogpost/${postId}`);

    dispatch({
      type: BlogPostActionTypes.removePost,
      payload: postId,
    });

    dispatch(setAlert({ msg: "Post was removed", type: "success" }));
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
