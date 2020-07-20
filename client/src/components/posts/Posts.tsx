/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBlogPostWithQuery, GetPostQuery } from '../../actions/blogPost';

import './Post.scss';
import { AppState } from '../../store';
import PostItem from './PostItem';
import { BlogPost } from '../../reducers/blogPost';
import PostsMenu from './PostsMenu';

interface PostsProps extends RouteComponentProps {
  posts: BlogPost[];
  getBlogPostWithQuery: (query: GetPostQuery) => void;
}

const Posts = ({ getBlogPostWithQuery, posts }: PostsProps) => {
  const [submitSearch, setSubmitSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<GetPostQuery>({
    search: '',
    postId: undefined,
  });

  useEffect(() => {
    getBlogPostWithQuery(searchQuery);
  }, [getBlogPostWithQuery, submitSearch]);

  const renderBlogPostList = posts.map((post) => (
    <PostItem key={post.id} post={post} />
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
  posts: state.blogPost.posts,
});

export default connect(mapStateToProps, { getBlogPostWithQuery })(Posts);
