// Auth Types
export enum AuthActionTypes {
  register = 'REGISTER USER',
  login = 'LOGIN USER',
  logout = 'LOGOUT USER',
  getUser = 'GET USER',
}

// Alert Types
export enum AlertActionTypes {
  setAlert = 'SET ALERT',
  removeAlert = 'REMOVE_ALERT',
}

// BlogPost Types
export enum BlogPostActionTypes {
  createPost = 'CREATE_POST',
  updatePost = 'UPDATE_POST',
  searchBlogPost = 'SEARCH_BLOGPOST',
  getBLogPostById = 'GET_BLOGPOST_BY_ID',
  getAllPosts = 'GET_ALL_POSTS',
  getCurrUserPost = 'GET_CURR_USER_POST',
  removePost = 'REMOVE_POST',

  addComment = 'ADD_COMMENT',
  editComment = 'EDIT_COMMENT',
  removeComment = 'REMOVE_COMMENT',
}
