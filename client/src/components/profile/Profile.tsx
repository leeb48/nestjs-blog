/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/auth';
import './Profile.scss';
import { AppState } from '../../store';
import { User } from '../../reducers/auth';
import UserStats from './UserStats';
import UserInfo from './UserInfo';

interface ProfileProps {
  user: User | null;
  getUser: () => void;
}

const Profile = ({ user, getUser }: ProfileProps) => {
  useEffect(() => {
    getUser();
  }, [getUser]);

  return !user ? null : (
    <Fragment>
      <div className="container profile-container">
        <div className="columns is-centered">
          <div className="column is-9">
            <section className="hero is-info welcome is-small user-hero">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">Hello {user.username}</h1>
                </div>
              </div>
            </section>

            <UserStats
              dateRegistered={user.dateRegistered}
              numberOfPosts={user.blogPostsFromUser.length}
            />

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
              <UserInfo
                firstName={user.firstName}
                lastName={user.lastName}
                bio={user.bio}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { getUser })(Profile);
