import React from 'react';
import { loadUsers } from '../store/users';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Users = (props) => {
  console.log(props.users);
  const usersList = props.users.length
    ? props.users.map((user) => {
        return (
          <div key={user.id}>
            <Link to={`/profile/${user.id}`}>{user.username}</Link>
          </div>
        );
      })
    : null;
  return <div>{usersList}</div>;
};

// const mapDispatch = (dispatch) => {
//   return {
//     loadUsers: async () => await dispatch(loadUsers()),
//   };
// };

export default connect((state) => state)(Users);
