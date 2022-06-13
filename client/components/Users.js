import React from 'react';
import { loadUsers } from '../store/users';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Users = (props) => {
  const {users, auth} = props
  if(!users) return 'loading'

  const usersList = users.map((user) => {
        if(user.id === auth.id) return null
        return (
          <div key={user.id}>
            <Link to={`/profile/${user.id}`}>{user.username}</Link>
          </div>
        );
      })

  return <div>{usersList}</div>;
};

// const mapDispatch = (dispatch) => {
//   return {
//     loadUsers: async () => await dispatch(loadUsers()),
//   };
// };

export default connect((state) => state)(Users);
