import React from 'react';
import { connect } from 'react-redux';
import Post from './Post';

/**
 * COMPONENT
 */
const Home = (props) => {
  const { username, id } = props;

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <Post/>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
