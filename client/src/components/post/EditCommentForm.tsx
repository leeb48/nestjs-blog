import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { editComment } from '../../actions/blogPost';
import { RouteComponentProps } from 'react-router-dom';
import { PostComment } from '../../reducers/blogPost';
import { EditPostCommentDto } from '../../actions/blogPost';

interface LocationState {
  postId: number;
  comment: PostComment;
}

interface EditCommentFormProps
  extends RouteComponentProps<{}, {}, LocationState> {
  editComment: (
    editCommentDto: EditPostCommentDto,
    postId: number,
    commentId: number
  ) => void;
}

const EditCommentForm = ({ location, editComment }: EditCommentFormProps) => {
  const { postId, comment } = location.state;

  const [formData, setFormData] = useState<EditPostCommentDto>({
    content: '',
  });

  useEffect(() => {
    setFormData({ content: comment.content });
  }, []);

  const { content } = formData;

  const onChange = (e: React.FormEvent<HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    editComment(formData, postId, comment.id);
  };

  return (
    <div className="container">
      <div className="card article">
        <div className="card-content">
          <div className="media">
            <div className="media-content has-text-centered">
              <p className="title is-4 article-title">Edit Comment</p>
            </div>
          </div>
          <div className="content-article-body">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="field">
                <div className="control">
                  <textarea
                    className="textarea is-primary"
                    placeholder="Leave your comment here"
                    onChange={(e) => onChange(e)}
                    value={content}
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

export default connect(null, { editComment })(EditCommentForm);
