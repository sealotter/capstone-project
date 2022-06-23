import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Button } from '@material-ui/core';
import { createPost } from '../store';

class PostComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComment: false,
      content: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { post, showCommentBox } = this.props;
    if (prevProps.showCommentBox !== post.id && showCommentBox === post.id)
      this.setState({ showComment: true });
    if (prevProps.showCommentBox === post.id && showCommentBox !== post.id)
      this.setState({ showComment: false });
  }

  onSubmit = (ev) => {
    const { content } = this.state;
    const { auth, post, createPost, handleComment } = this.props;
    ev.preventDefault();
    createPost(content, auth.id, post.id);
    this.setState({ content: '', showComment: false });
    handleComment();
  };

  onChange = (ev) => {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  };

  render() {
    const { post, auth, handleComment } = this.props;
    const { showComment, content } = this.state;
    const { onChange, onSubmit } = this;
    if (!showComment) return null;
    return (
      <div className="postBox">
        <form onSubmit={onSubmit}>
          <div className="postBox_input">
            <Avatar src={auth.avatarUrl} />
            <input
              onChange={onChange}
              name="content"
              value={content}
              placeholder="comment something..."
            ></input>
          </div>
          <button
            onClick={onSubmit}
            className="postBox_button"
            disabled={!content}
          >
            +
          </button>
          <button
            className="close_button"
            onClick={() => {
              this.setState({ showComment: false });
              handleComment();
            }}
          >
            Close
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    writeComment: () => {
      dispatch(createPost());
    },
    createPost: (content, userId, postId) => {
      dispatch(createPost(content, userId, postId));
    },
  };
};

export default connect((state) => state, mapDispatch)(PostComment);
