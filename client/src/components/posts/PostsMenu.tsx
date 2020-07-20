import React from 'react';
import { Link } from 'react-router-dom';

const PostsMenu = () => {
  return (
    <div className="column is-3">
      <Link to="/newpost" className="button is-info is-block is-alt is-large">
        New Post
      </Link>
      <aside className="menu">
        <p className="menu-label">Filters</p>
        <ul className="menu-list">
          <li>
            <span className="filter-button tag is-link is-large">Popular</span>
          </li>
          <li>
            <span className="filter-button tag is-warning is-large">
              Recent
            </span>
          </li>
          <li>
            <span className="filter-button tag is-success is-large">
              Rising
            </span>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default PostsMenu;
