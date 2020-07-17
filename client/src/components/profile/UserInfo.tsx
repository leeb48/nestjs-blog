import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

interface UserInfoProps {
  firstName: string;
  lastName: string;
  bio: string;
}

const UserInfo = ({ firstName, lastName, bio }: UserInfoProps) => {
  return (
    <Fragment>
      <div className="column is-6">
        <div className="card">
          <div className="card-content">
            <div className="media-content">
              <p className="title is-5">
                {firstName} {lastName}
              </p>
              <Link to="/edit-bio" className="subtitle is-6 has-text-info">
                Edit Bio
              </Link>
            </div>

            <div className="content">{bio}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserInfo;
