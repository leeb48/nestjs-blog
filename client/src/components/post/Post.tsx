import React from 'react';

const Post = () => {
  return (
    <div className="container">
      <section className="post">
        <div className="column is-8 is-offset-2">
          <div className="card article">
            <div className="card-content">
              <div className="media">
                <div className="media-content has-text-centered">
                  <p className="title article-title">Post Title</p>
                  <p className="subtitle is-5">By Username</p>
                </div>
              </div>
              <div className="content-article-body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto a ex quibusdam? Alias dolor minus in aliquam vero
                autem consequatur, harum consequuntur excepturi ut dolore
                exercitationem suscipit nisi laborum, voluptates quae at facilis
                dignissimos debitis praesentium nulla a cum ipsa.
              </div>
            </div>
          </div>
          {/* TODO: CreateComment Component */}
          <div className="card article">
            <div className="card-content">
              <div className="media">
                <div className="media-content has-text-centered">
                  <p className="title is-4 article-title">Comments</p>
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
                    Leave a comment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* TODO: CommentList Component */}
        <div className="column is-8 is-offset-2">
          <div className="card article">
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-5">username</p>
                  <p className="subtitle is-6">04/14/2020</p>
                </div>
              </div>
              <div className="content-article-body">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem,
                modi.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Post;
