//---------------------------------------------------------------------
// BLOGPOST STATE
export interface BlogPost {
  id: number;
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
export const blogPost = (state: BlogPostState = initalState, action: any) => {};
