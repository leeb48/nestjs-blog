import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getBlogPostWithQuery, GetPostQuery } from '../../actions/blogPost';
import { AppState } from '../../store';
import PostContent from './PostContent';
import { RouteComponentProps } from 'react-router-dom';
import { BlogPost } from '../../reducers/blogPost';

interface RouteInfo {
  id: string;
}

interface PostInterface extends RouteComponentProps<RouteInfo> {
  getBlogPostWithQuery: (query: GetPostQuery) => void;
  post: BlogPost | null;
}

const Post = ({ getBlogPostWithQuery, match, post }: PostInterface) => {
  useEffect(() => {
    // Get the data about the current post from the DB
    // with the postId
    const id = match.params.id;
    getBlogPostWithQuery({ search: '', postId: parseInt(id) });
  }, [getBlogPostWithQuery, match.params.id]);

  return (
    <div className="container">
      <section className="post">
        <div className="column is-8 is-offset-2">
          {post && <PostContent post={post} />}

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

const mapStateToProps = (state: AppState) => ({
  post: state.blogPost.post,
});

export default connect(mapStateToProps, { getBlogPostWithQuery })(Post);
