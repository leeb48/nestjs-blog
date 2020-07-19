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
  getPostWithQuery = 'GET_POST_WITH_QUERY',
  getCurrUserPost = 'GET_CURR_USER_POST',
  removePost = 'REMOVE_POST',
}
