/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logoutUser } from '../../actions/auth';
import { AppState } from '../../store';
import { AuthState } from '../../reducers/auth';

interface NavbarProps {
  auth: AuthState;
  logoutUser: () => void;
}

const Navbar = ({ auth: { isAuthenticated }, logoutUser }: NavbarProps) => {
  let history = useHistory();

  const handleLogout = () => {
    logoutUser();
    history.push('/');
  };

  // Navbar Button & Menu configuration
  const loggedInButtons = (
    <Fragment>
      <a onClick={handleLogout} className="button is-danger">
        Log Out
      </a>
    </Fragment>
  );

  const guestButtons = (
    <Fragment>
      <Link to="/login" className="button is-light">
        Log in
      </Link>
      <Link to="/register" className="button is-primary">
        <strong>Sign up</strong>
      </Link>
    </Fragment>
  );

  const loggedInMenu = (
    <Fragment>
      <Link to="/myprofile" className="navbar-item">
        My Profile
      </Link>
    </Fragment>
  );

  const dropdownMenu = (
    <Fragment>
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link">More</a>

        <div className="navbar-dropdown">
          <Link to="/about" className="navbar-item">
            About
          </Link>
          <a className="navbar-item">Jobs</a>
          <a className="navbar-item">Contact</a>
          <hr className="navbar-divider" />
          <a className="navbar-item">Report an issue</a>
        </div>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Home
            </Link>

            {isAuthenticated && loggedInMenu}

            {dropdownMenu}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {isAuthenticated ? loggedInButtons : guestButtons}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
