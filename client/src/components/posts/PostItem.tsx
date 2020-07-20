import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../reducers/blogPost';

interface PostItemProps {
  post: BlogPost;
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <article className="post">
      <Link to={`/post/${post.id}`} className="title is-4">
        {post.title}{' '}
      </Link>
      <div className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <Link to="/" className="has-text-black" href="#">
                {post.username}
              </Link>
            </p>
          </div>
        </div>
        <div className="media-right">
          <p className="tag">{post.datePosted}</p>
          <span className="like-icon has-text-danger">
            <i className="fas fa-heart"></i> 2
          </span>
          <span className="has-text-info">
            <i className="fa fa-comments"></i> 1
          </span>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
