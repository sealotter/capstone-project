import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../store';
import { Avatar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Posts from './Posts';

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
    const { auth } = this.props;
    ev.preventDefault();
    this.props.createPost(this.state.content, auth.id);
    this.setState({ content: '' });
  };

  render() {
    const { content } = this.state;
    const { onChange, onSubmit } = this;
    const { auth, id, friendsId } = this.props;
    return (
      <>
        {!id || (id && auth.id === id * 1) ? (
          <div className="postBox postBoxMain">
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
              <button
                onClick={onSubmit}
                className="postBox_button"
                disabled={!content}
              >
                +
              </button>
            </form>
          </div>
        ) : null}

        <Posts id={id} friendsId={friendsId} />
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
