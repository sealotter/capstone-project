import React from "react";
import { connect } from "react-redux";
import { loadPosts } from "../store";

const Posts = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => {
        return <li key={post.id}> {post.content}</li>;
      })}
    </ul>
  );
};

const mapState = ({ auth, users, posts }) => {
  return {
    auth,
    users,
    posts,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadPosts: () => {
      dispatch(loadPosts());
    },
  };
};

export default connect(mapState, mapDispatch)(Posts);
