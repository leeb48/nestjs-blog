import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createPost, CreatePostDto } from '../../actions/blogPost';
import './NewPostForm.scss';
import { RouteComponentProps } from 'react-router-dom';

interface NewPostFormProps extends RouteComponentProps {
  createPost: (newPostData: CreatePostDto, history: any) => void;
}

const NewPostForm = ({ createPost, history }: NewPostFormProps) => {
  const [formData, setFormData] = useState<CreatePostDto>({
    title: '',
    content: '',
  });

  const { title, content } = formData;

  const onChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) =>
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createPost(formData, history);
  };

  return (
    <div className="container">
      <section className="blog-form">
        <div className="column is-8 is-offset-2">
          <div className="card article">
            <div className="card-content">
              <div className="media">
                <div className="media-content has-text-centered">
                  <p className="title article-title">A New Blog Post</p>
                </div>
              </div>
              <div className="content-article-body">
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-primary"
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => onChange(e)}
                        placeholder="Title"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <textarea
                        className="textarea is-primary"
                        name="content"
                        value={content}
                        onChange={(e) => onChange(e)}
                        placeholder="Your post goes here"
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
      </section>
    </div>
  );
};

export default connect(null, { createPost })(NewPostForm);
