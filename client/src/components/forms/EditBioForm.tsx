import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editBio } from '../../actions/auth';
import { RouteComponentProps } from 'react-router-dom';
import { EditBioDto } from '../../actions';

interface LocationProp {
  bio: string;
}

interface EditBioForm extends RouteComponentProps<{}, {}, LocationProp> {
  editBio: (editBioDto: EditBioDto) => void;
}

const EditBioForm = ({ location: { state }, editBio }: EditBioForm) => {
  const [formData, setFormData] = useState({ bio: '' });

  useEffect(() => {
    setFormData({ bio: state.bio });
  }, []);

  const { bio } = formData;

  const onChange = (e: React.FormEvent<HTMLTextAreaElement>) =>
    setFormData({ bio: e.currentTarget.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    editBio(formData);
  };

  return (
    <div className="container">
      <div className="card article">
        <div className="card-content">
          <div className="media">
            <div className="media-content has-text-centered">
              <p className="title is-4 article-title">Edit Bio</p>
            </div>
          </div>
          <div className="content-article-body">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="field">
                <div className="control">
                  <textarea
                    className="textarea is-primary"
                    placeholder="Leave your comment here"
                    value={bio}
                    onChange={(e) => onChange(e)}
                    name="content"
                  ></textarea>
                </div>
              </div>
              <button className="submit-button button is-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { editBio })(EditBioForm);
