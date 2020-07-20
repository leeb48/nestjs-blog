import React from 'react';
import { BlogPost } from '../../reducers/blogPost';

interface PostContentProps {
  post: BlogPost;
}

const PostContent = ({ post }: PostContentProps) => {
  return (
    <div className="card article">
      <div className="card-content">
        <div className="media">
          <div className="media-content has-text-centered">
            <p className="title article-title">{post.title}</p>
            <p className="subtitle is-5">{post.username}</p>
          </div>
        </div>
        <div className="content-article-body">{post.content}</div>
      </div>
    </div>
  );
};

export default PostContent;
