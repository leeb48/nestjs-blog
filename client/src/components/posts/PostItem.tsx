import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../reducers/blogPost';
import './Post.scss';
import { User } from '../../reducers/auth';

interface PostItemProps {
  post: BlogPost;
  user: User | null;
  removeBlogPost: (postId: number) => void;
}

const PostItem = ({ post, user, removeBlogPost }: PostItemProps) => {
  const loggedInButtons =
    user && user.username === post.username ? (
      <div className="media-content">
        <div className="level post-buttons">
          <button
            onClick={() => removeBlogPost(post.id)}
            className="button is-small is-danger level-left"
          >
            Remove
          </button>
          <button className="button is-small is-warning level-right">
            Edit
          </button>
        </div>
      </div>
    ) : null;

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
          {loggedInButtons}
          <div className="media-content">
            <p className="tag">{post.datePosted}</p>
            <span className="like-icon has-text-danger">
              <i className="fas fa-heart"></i> 2
            </span>
            <span className="has-text-info">
              <i className="fa fa-comments"></i> 1
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
