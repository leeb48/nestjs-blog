/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import './Post.scss';

// State Management
import { AppState } from '../../store';
import { BlogPost } from '../../reducers/blogPost';
import { User } from '../../reducers/auth';

// Components
import PostsMenu from './PostsMenu';
import PostItem from './PostItem';

// Action Creators
import { getBlogPostWithQuery, GetPostQuery } from '../../actions/blogPost';
import { getUser } from '../../actions';
import { removeBlogPost } from '../../actions/blogPost';

interface PostsProps extends RouteComponentProps {
  posts: BlogPost[];
  user: User | null;
  getBlogPostWithQuery: (query: GetPostQuery) => void;
  getUser: () => void;
  removeBlogPost: (postId: number) => void;
}

const Posts = ({
  getBlogPostWithQuery,
  getUser,
  removeBlogPost,
  posts,
  user,
}: PostsProps) => {
  const [submitSearch, setSubmitSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<GetPostQuery>({
    search: '',
    postId: undefined,
  });

  // Current user's info is needed to render user sensitive options
  // such as editing or removing posts
  useEffect(() => {
    getUser();
  }, [getUser]);

  // Query a search to the backend only when user has finished typing
  //  the search term
  useEffect(() => {
    getBlogPostWithQuery(searchQuery);
  }, [getBlogPostWithQuery, submitSearch]);

  // Render Methods
  const renderBlogPostList = posts.map((post) => (
    <PostItem
      key={post.id}
      post={post}
      user={user}
      removeBlogPost={removeBlogPost}
    />
  ));

  const onChange = (e: React.FormEvent<HTMLInputElement>) =>
    setSearchQuery({
      ...searchQuery,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitSearch(!submitSearch);

    console.log(submitSearch);
  };

  return (
    <Fragment>
      <section className="post-container container">
        <div className="columns">
          <PostsMenu />

          <div className="column is-9">
            <form className="searchbar">
              <div className="field has-addons">
                <div className="control">
                  <input
                    className="input"
                    name="search"
                    onChange={(e) => onChange(e)}
                    type="text"
                    placeholder="Find a repository"
                  />
                </div>
                <button
                  onClick={(e) => onSubmit(e)}
                  type="button"
                  className="button is-info"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="box content">{renderBlogPostList}</div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
  posts: state.blogPost.posts,
});

export default connect(mapStateToProps, {
  getBlogPostWithQuery,
  getUser,
  removeBlogPost,
})(Posts);
