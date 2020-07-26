import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../reducers/auth';

interface RecentPostProps {
  user: User;
  removeBlogPost: (postId: number) => void;
}

const RecentPost = ({ user, removeBlogPost }: RecentPostProps) => {
  const fiveRecentPosts = user.blogPostsFromUser.slice(0, 6);

  const renderRecentPosts = fiveRecentPosts.map((post) => (
    <tr key={post.id}>
      <td width="5%">
        <i className="fas fa-feather-alt"></i>
      </td>
      <td>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </td>
      <td className="level-right">
        <Link
          to={`/editpost/${post.id}`}
          className="button is-small is-warning post-button profile-post-btn"
        >
          Edit
        </Link>
        <button
          onClick={() => removeBlogPost(post.id)}
          className="button is-small is-danger profile-post-btn"
        >
          Remove
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="column is-6">
      <div className="card event-card">
        <header className="card-header">
          <p className="card-header-title">My recent posts</p>
        </header>
        <div className="card-table">
          <div className="content">
            <table className="table is-fullwidth is-striped">
              <tbody>{user.blogPostsFromUser && renderRecentPosts}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentPost;
