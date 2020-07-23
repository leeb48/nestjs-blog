import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  updateBlogPost,
  UpdatePostDto,
  getBlogPostById,
} from '../../actions/blogPost';
import './EditPostForm.scss';
import { RouteComponentProps } from 'react-router-dom';
import { BlogPost } from '../../reducers/blogPost';
import { AppState } from '../../store';

interface RouteInfo {
  postId: string;
}

interface NewPostFormProps extends RouteComponentProps<RouteInfo> {
  post: BlogPost | null;
  updateBlogPost: (updatePostDto: UpdatePostDto, postId: string) => void;
  getBlogPostById: (postId: string) => void;
}

const NewPostForm = ({
  updateBlogPost,
  getBlogPostById,
  post,
  match,
}: NewPostFormProps) => {
  const [formData, setFormData] = useState<UpdatePostDto>({
    title: '',
    content: '',
  });

  // ID of the post coming from URL
  const postId: string = match.params.postId;

  // Get the post that needs to be udpated
  useEffect(() => {
    getBlogPostById(postId);
  }, [getBlogPostById, postId]);

  // Fill the form with blogPost data
  useEffect(() => {
    if (post !== null) {
      setFormData({ title: post.title, content: post.content });
    }
  }, [post]);

  const { title, content } = formData;

  const onChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) =>
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateBlogPost(formData, postId);
  };

  return (
    post && (
      <div className="container">
        <section className="blog-form">
          <div className="column is-8 is-offset-2">
            <div className="card article">
              <div className="card-content">
                <div className="media">
                  <div className="media-content has-text-centered">
                    <p className="title article-title">Edit Post</p>
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
    )
  );
};

const mapStateToProps = (state: AppState) => ({
  post: state.blogPost.post,
});

export default connect(mapStateToProps, { updateBlogPost, getBlogPostById })(
  NewPostForm
);
