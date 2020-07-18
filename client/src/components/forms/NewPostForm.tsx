import React from 'react';
import './NewPostForm.scss';

const NewPostForm = () => {
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
                <form>
                  <div className="field">
                    <div className="control">
                      <textarea
                        className="textarea is-primary"
                        placeholder="Primary textarea"
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

export default NewPostForm;
