/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/auth';
import './Profile.scss';
import { AppState } from '../../store';
import { User } from '../../reducers/auth';
import UserStats from './UserStats';
import UserInfo from './UserInfo';
import RecentPost from './RecentPost';

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

            <div className="columns">
              <RecentPost />
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
