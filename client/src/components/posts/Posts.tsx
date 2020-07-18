/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './Post.scss';

const Posts = () => {
  return (
    <Fragment>
      <section className="post-container container">
        <div className="columns">
          {/* TODO: PostMenu Component */}
          <div className="column is-3">
            <Link
              to="/newpost"
              className="button is-info is-block is-alt is-large"
            >
              New Post
            </Link>
            <aside className="menu">
              <p className="menu-label">Filters</p>
              <ul className="menu-list">
                <li>
                  <span className="filter-button tag is-link is-large">
                    Popular
                  </span>
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

          <div className="column is-9">
            <div className="box content">
              <article className="post">
                <a className="title is-4">Article 1</a>
                <div className="media">
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <a className="has-text-black" href="#">
                          username
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="media-right">
                    <p className="tag">07/16/2020</p>
                    <span className="like-icon has-text-danger">
                      <i className="fas fa-heart"></i> 2
                    </span>
                    <span className="has-text-info">
                      <i className="fa fa-comments"></i> 1
                    </span>
                  </div>
                </div>
              </article>

              <article className="post">
                <a className="title is-4">Article 1</a>
                <div className="media">
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <a className="has-text-black" href="#">
                          username
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="media-right">
                    <p className="tag">07/16/2020</p>
                    <span className="like-icon has-text-danger">
                      <i className="fas fa-heart"></i> 2
                    </span>
                    <span className="has-text-info">
                      <i className="fa fa-comments"></i> 1
                    </span>
                  </div>
                </div>
              </article>
              <article className="post">
                <a className="title is-4">Article 1</a>
                <div className="media">
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <a className="has-text-black" href="#">
                          username
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="media-right">
                    <p className="tag">07/16/2020</p>
                    <span className="like-icon has-text-danger">
                      <i className="fas fa-heart"></i> 2
                    </span>
                    <span className="has-text-info">
                      <i className="fa fa-comments"></i> 1
                    </span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Posts;
