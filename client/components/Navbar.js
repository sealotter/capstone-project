import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { Avatar } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import MovieIcon from '@material-ui/icons/Movie';
import MessageIcon from '@material-ui/icons/Message';

const Navbar = ({ handleClick, isLoggedIn, auth }) => (
  <div className='mainBar'>
    <nav className="mainNav">
      {isLoggedIn ? (
        <>
          <div className="nav-left">
            {/* <Link to="/media"> */}
            <img src="/../images/movie logo.png" className="logo" />
            {/* </Link> */}
            

            {/* The navbar will show these links after you log in */}
            <Link to="/home">
              <HomeIcon style={{fill: '#630606'}} />
            </Link>
            <Link to="/users">
              <PeopleIcon style={{fill: '#630606'}}/>
            </Link>
            <Link to="/media">
              <MovieIcon style={{fill: '#630606'}} />
            </Link>
            <Link to="/chat">
              <MessageIcon  style={{fill: '#630606'}}/>
            </Link>
            {/* <Link to='/friendslist'>Friends List</Link>
            <Link to ='/watchlist'>Watch List</Link> */}
          </div>
          <div className="nav-right">
            <Link to={`/profile/${auth?.id}`} className="online">
              {auth ? <Avatar src={auth.avatarUrl} style={{fill: '#630606'}}/> : <Avatar />}{' '}
              {auth.username}
            </Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </>
      ) : (
        <div className="nav-right">
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
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
