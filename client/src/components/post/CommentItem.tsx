import React from 'react';
import { Link } from 'react-router-dom';
import { PostComment } from '../../reducers/blogPost';

interface CommentItemProps {
  comment: PostComment;
  postId: number;
  currUser: string | undefined;
  removeComment: (commentId: number) => void;
}

const CommentItem = ({
  comment,
  postId,
  currUser,
  removeComment,
}: CommentItemProps) => {
  const { content, username } = comment;

  const renderLoggedIn = (
    <div className="level comment-buttons">
      <Link
        to={{
          pathname: `/editcomment`,
          state: {
            postId: postId,
            comment: comment,
          },
        }}
        className="button is-small is-warning level-right"
      >
        edit
      </Link>
      <button
        onClick={() => removeComment(comment.id)}
        className="button is-small is-danger level-right"
      >
        remove
      </button>
    </div>
  );

  return (
    <div className="card article">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-5">{username}</p>
          </div>
          {currUser === comment.username ? renderLoggedIn : null}
        </div>
        <div className="content-article-body">{content}</div>
      </div>
    </div>
  );
};

export default CommentItem;
