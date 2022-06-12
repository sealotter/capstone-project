import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import list from '../store';

const Navbar = ({ handleClick, isLoggedIn, list}) => (
  
  <div>
    <h1>FS-App-Template</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link> 
          <Link to="/profile">Profile</Link>
          <Link to="/users">Users</Link>

          <Link to='/friendslist'>Friends List</Link>

          <Link to="/media">Media</Link>

          <Link to ='/watchlist'>Watch List: ({list.length})</Link>

          <a href="#" onClick={handleClick}>

            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/movies">Movies</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    list
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
