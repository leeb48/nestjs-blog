import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { loginUser, LoginUserDto } from '../../actions/auth';
import './Login.scss';

interface LoginUserProps {
  loginUser: (loginForm: LoginUserDto) => void;
}

const Login = ({ loginUser }: LoginUserProps) => {
  const [formData, setFormData] = useState<LoginUserDto>({
    username: '',
    password: '',
  });

  const { username, password } = formData;

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

export default connect(null, { loginUser })(Login);
