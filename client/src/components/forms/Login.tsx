import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loginUser, LoginUserDto } from '../../actions/auth';
import './Login.scss';
import { useHistory } from 'react-router-dom';
import { AppState } from '../../store';
import { AuthState } from '../../reducers/auth';

interface LoginUserProps {
  auth: AuthState;
  loginUser: (loginForm: LoginUserDto) => void;
}

const Login = ({ loginUser, auth: { isAuthenticated } }: LoginUserProps) => {
  const [formData, setFormData] = useState<LoginUserDto>({
    username: '',
    password: '',
  });

  const { username, password } = formData;
  let history = useHistory();

  // Redirect the user to home after successful login
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [history, isAuthenticated]);

  const onChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) =>
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginUser(formData);
  };

  return (
    <Fragment>
      <form className="container login-container" onSubmit={(e) => onSubmit(e)}>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className="input"
              onChange={(e) => onChange(e)}
              name="username"
              value={username}
              type="text"
              placeholder="Username"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              onChange={(e) => onChange(e)}
              name="password"
              value={password}
              type="password"
              placeholder="Enter a password"
            />
          </div>
        </div>

        <button className="button is-success">Log In</button>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(Login);
