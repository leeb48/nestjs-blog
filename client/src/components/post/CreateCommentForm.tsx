import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createComment, CreateCommentDto } from '../../actions/blogPost';

interface CreateCommentFormProps {
  postId: number;
  createComment: (createCommentDto: CreateCommentDto, postId: number) => void;
}

const CreateCommentForm = ({
  postId,
  createComment,
}: CreateCommentFormProps) => {
  const [formData, setFormData] = useState<CreateCommentDto>({ content: '' });

  const { content } = formData;

  const onChange = (e: React.FormEvent<HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createComment(formData, postId);
  };

  return (
    <div className="card article">
      <div className="card-content">
        <div className="media">
          <div className="media-content has-text-centered">
            <p className="title is-4 article-title">Comments</p>
          </div>
        </div>
        <div className="content-article-body">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="field">
              <div className="control">
                <textarea
                  className="textarea is-primary"
                  placeholder="Leave your comment here"
                  name="content"
                  onChange={(e) => onChange(e)}
                  value={content}
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
  );
};

export default connect(null, { createComment })(CreateCommentForm);
