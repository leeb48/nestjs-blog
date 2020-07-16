/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import './Profile.scss';

const Profile = () => {
  return (
    <Fragment>
      <div className="container profile-container">
        <div className="columns">
          <div className="column is-9">
            <section className="hero is-info welcome is-small user-hero">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">Hello User</h1>
                </div>
              </div>
            </section>

            {/* TODO: UserStats Component */}
            <section className="info-tiles">
              <div className="tile is-ancestor has-text-centered">
                <div className="tile is-parent">
                  <article className="tile is-child box">
                    <p className="title">10</p>
                    <p className="subtitle"># of posts</p>
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child box">
                    <p className="title">42</p>
                    <p className="subtitle"># of liked posts</p>
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child box">
                    <p className="title">07/16/2020</p>
                    <p className="subtitle">Member since</p>
                  </article>
                </div>
              </div>
            </section>

            {/* TODO: RecentPost Component */}
            <div className="columns">
              <div className="column is-6">
                <div className="card event-card">
                  <header className="card-header">
                    <p className="card-header-title">My recent posts</p>
                  </header>
                  <div className="card-table">
                    <div className="content">
                      <table className="table is-fullwidth is-striped">
                        <tbody>
                          {/* TODO: PostListItem Component */}
                          <tr>
                            <td width="5%">
                              <i className="fas fa-feather-alt"></i>
                            </td>
                            <td>My post</td>
                            <td className="level-right">
                              <a
                                href="#"
                                className="button is-small is-primary post-button profile-post-btn"
                              >
                                Edit
                              </a>
                              <a
                                href="#"
                                className="button is-small is-danger profile-post-btn"
                              >
                                Remove
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td width="5%">
                              <i className="fas fa-feather-alt"></i>
                            </td>
                            <td>My post</td>
                            <td className="level-right">
                              <a
                                href="#"
                                className="button is-small is-primary post-button profile-post-btn"
                              >
                                Edit
                              </a>
                              <a
                                href="#"
                                className="button is-small is-danger profile-post-btn"
                              >
                                Remove
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td width="5%">
                              <i className="fas fa-feather-alt"></i>
                            </td>
                            <td>My post</td>
                            <td className="level-right">
                              <a
                                href="#"
                                className="button is-small is-primary post-button profile-post-btn"
                              >
                                Edit
                              </a>
                              <a
                                href="#"
                                className="button is-small is-danger profile-post-btn"
                              >
                                Remove
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <footer className="card-footer">
                    <a href="" className="card-footer-item">
                      View All
                    </a>
                  </footer>
                </div>
              </div>

              {/* UserInfo Component */}
              <div className="column is-6">
                <div className="card">
                  <div className="card-content">
                    <div className="media-content">
                      <p className="title is-5">Mango Lee</p>
                      <a className="subtitle is-6 has-text-info">Edit Bio</a>
                    </div>

                    <div className="content">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Dolor nostrum quae placeat aliquid nihil esse eum
                      accusamus magnam commodi tenetur.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
