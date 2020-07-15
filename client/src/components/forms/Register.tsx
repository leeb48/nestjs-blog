import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { registerUser, CreateUserDto } from '../../actions/auth';

interface RegisterUserProps {
  registerUser: (registerForm: CreateUserDto) => void;
}

const Register = ({ registerUser }: RegisterUserProps) => {
  const [formData, setFormData] = useState<CreateUserDto>({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    bio: '',
  });

  const { firstName, lastName, username, password, bio } = formData;

  const onChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) =>
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    registerUser(formData);
  };

  return (
    <Fragment>
      <form className="container" onSubmit={(e) => onSubmit(e)}>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input
              className="input"
              onChange={(e) => onChange(e)}
              name="firstName"
              value={firstName}
              type="text"
              placeholder="First Name"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input
              className="input"
              onChange={(e) => onChange(e)}
              name="lastName"
              value={lastName}
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>

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

        <div className="field">
          <label className="label">Bio</label>
          <div className="control">
            <textarea
              className="textarea is-info"
              onChange={(e) => onChange(e)}
              name="bio"
              value={bio}
              placeholder="Write about yourself"
            ></textarea>
          </div>
        </div>

        <button className="button is-success">Register</button>
      </form>
    </Fragment>
  );
};

export default connect(null, { registerUser })(Register);
