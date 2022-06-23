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
  <div className="mainBar">
    <nav className="mainNav" style={{paddingBottom: '7px'}}>
      {isLoggedIn ? (
        <>
          <div className="nav-left">
            {/* <Link to="/media"> */}
            <img src="/../images/movie logo.png" className="logo" />
            {/* </Link> */}

            {/* The navbar will show these links after you log in */}
            <Link to="/home" style={{ marginRight: '35px' }}>
              <HomeIcon
                style={{
                  fill: '#630606',
                  fontSize: '27px',
                }}
              />
            </Link>
            <Link to="/users" style={{ marginRight: '35px' }}>
              <PeopleIcon style={{ fill: '#630606', fontSize: '27px' }} />
            </Link>
            <Link to="/media" style={{ marginRight: '35px' }}>
              <MovieIcon style={{ fill: '#630606', fontSize: '27px' }} />
            </Link>
            <Link to="/chat" style={{ marginRight: '35px' }}>
              <MessageIcon style={{ fill: '#630606', fontSize: '27px' }} />
            </Link>
            {/* <Link to='/friendslist'>Friends List</Link>
            <Link to ='/watchlist'>Watch List</Link> */}
          </div>
          <div className="nav-right">
            <Link to={`/profile/${auth?.id}`} className="online">
              {auth ? (
                <Avatar src={auth.avatarUrl} style={{ fill: '#630606' }} />
              ) : (
                <Avatar />
              )}{' '}
              {auth.username}
            </Link>
            <a
              href="#"
              onClick={handleClick}
              style={{
                color: '#630606',
                marginBottom: '15px',
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
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
