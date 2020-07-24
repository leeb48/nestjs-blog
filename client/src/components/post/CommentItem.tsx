import React from 'react';
import { PostComment } from '../../reducers/blogPost';

interface CommentItemProps {
  comment: PostComment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const { content, username } = comment;

  return (
    <div className="card article">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-5">{username}</p>
          </div>
        </div>
        <div className="content-article-body">{content}</div>
      </div>
    </div>
  );
};

export default CommentItem;
