import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../store';
import { Avatar, Button } from '@material-ui/core';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      username: this.props.auth.username ? this.props.auth.username : '',
      avatarUrl:
        'https://lh3.googleusercontent.com/ogw/ADea4I4QIDvtZGTxFFQm4iseETZ78UUTpL9r85jLQYVecw=s32-c-mo',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (ev) => {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  };

  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.createPost(
      this.state.content,
      this.state.username,
      this.state.avatarUrl
    );
    this.setState({ content: '' });
  };

  render() {
    const { content, avatarUrl } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className="postBox">
        <form>
          <div className="postBox_input">
            <Avatar src={avatarUrl} />
            <input
              onChange={onChange}
              name="content"
              value={content}
              placeholder="what's on your mind?"
            ></input>
          </div>
          <Button
            onClick={onSubmit}
            className="postBox_button"
            disabled={!content}
          >
            +
          </Button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return state;
};
const mapDispatch = (dispatch) => {
  return {
    createPost: (content, username, avatarUrl) => {
      dispatch(createPost(content, username, avatarUrl));
    },
  };
};

export default connect(mapState, mapDispatch)(Post);
