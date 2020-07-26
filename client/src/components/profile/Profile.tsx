/* eslint-disable jsx-a11y/anchor-is-valid */
// React & Redux
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

// Action Creators
import { getUser } from '../../actions/auth';
import { removeBlogPost } from '../../actions/blogPost';
import './Profile.scss';

// State Management
import { AppState } from '../../store';
import { User } from '../../reducers/auth';

// Components
import UserStats from './UserStats';
import UserInfo from './UserInfo';
import RecentPost from './RecentPost';

interface ProfileProps {
  user: User | null;
  getUser: () => void;
  removeBlogPost: (postId: number) => void;
}

const Profile = ({ user, getUser, removeBlogPost }: ProfileProps) => {
  useEffect(() => {
    getUser();
  }, [getUser, user]);

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
              <RecentPost user={user} removeBlogPost={removeBlogPost} />
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

export default connect(mapStateToProps, { getUser, removeBlogPost })(Profile);
