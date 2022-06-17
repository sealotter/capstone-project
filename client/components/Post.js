import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../store';
import { Avatar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Posts from './posts'

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
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
    const {auth} = this.props
    ev.preventDefault();
    this.props.createPost(
      this.state.content,
      auth.id
    );
    this.setState({ content: '' });
  };

  render() {
    const { content, avatarUrl, userId } = this.state;
    const { onChange, onSubmit } = this;
    const {auth} = this.props

    return (
      <>
        <div className="postBox">
          <form onSubmit={onSubmit}>
            <div className="postBox_input">
              <Link to={`/profile/${auth.id}`}>
                <Avatar src={auth.avatarUrl} />
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
        <Posts/>
      </>
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
