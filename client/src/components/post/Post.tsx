import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getBlogPostById } from '../../actions/blogPost';
import { AppState } from '../../store';
import PostContent from './PostContent';
import { RouteComponentProps } from 'react-router-dom';
import { BlogPost } from '../../reducers/blogPost';
import CreateCommentForm from './CreateCommentForm';
import CommentItem from './CommentItem';

interface RouteInfo {
  id: string;
}

interface PostInterface extends RouteComponentProps<RouteInfo> {
  getBlogPostById: (postId: string) => void;
  post: BlogPost | null;
}

const Post = ({ getBlogPostById, match, post }: PostInterface) => {
  useEffect(() => {
    // Get the data about the current post from the DB
    // with the postId
    const id = match.params.id;
    getBlogPostById(id);
  }, [getBlogPostById, match.params.id]);

  const renderComments = post?.postComments.map((comment) => (
    <CommentItem key={comment.id} comment={comment} />
  ));

  return (
    post && (
      <div className="container">
        <section className="post">
          <div className="column is-8 is-offset-2">
            <PostContent post={post} />
            <CreateCommentForm postId={post.id} />
          </div>
          <div className="column is-8 is-offset-2">{renderComments}</div>
        </section>
      </div>
    )
  );
};

const mapStateToProps = (state: AppState) => ({
  post: state.blogPost.post,
});

export default connect(mapStateToProps, { getBlogPostById })(Post);
