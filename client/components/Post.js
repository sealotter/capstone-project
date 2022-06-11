import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../store';
import { Avatar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      username: this.props.auth.username ? this.props.auth.username : '',
      avatarUrl: this.props.auth.avatarUrl ? this.props.auth.avatarUrl : '',
      userId: this.props.auth.id ? this.props.auth.id : '',
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
      this.state.avatarUrl,
      this.state.userId
    );
    this.setState({ content: '' });
  };

  render() {
    const { content, avatarUrl, userId } = this.state;
    const { onChange, onSubmit } = this;

    return (
      <div className="postBox">
        <form onSubmit={onSubmit}>
          <div className="postBox_input">
            <Link to={`/profile/${userId}`}>
              <Avatar src={avatarUrl} />
            </Link>

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
    createPost: (content, username, avatarUrl, userId) => {
      dispatch(createPost(content, username, avatarUrl, userId));
    },
  };
};

export default connect(mapState, mapDispatch)(Post);
