import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../store';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
    };
    console.log(props);
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
    this.props.createPost(this.state.post);
    this.setState({ post: '' });
  };

  render() {
    const { post } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <>
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            name="post"
            value={post}
            placeholder="what's on your mind?"
          ></input>
          <button>Post</button>
        </form>
      </>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    createPost: (post) => {
      dispatch(createPost(post));
    },
  };
};

export default connect(null, mapDispatch)(Post);
