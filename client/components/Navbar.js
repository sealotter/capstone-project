import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { Avatar } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import MovieIcon from '@material-ui/icons/Movie';
import MessageIcon from '@material-ui/icons/Message';


const Navbar = ({ handleClick, isLoggedIn, auth}) => (

  <div>
    <nav className='mainNav'>
      {isLoggedIn ? (
        <>
          <div className='nav-left'>
            <img src='/../images/movie logo.png' className='logo'/>
            {/* The navbar will show these links after you log in */}
            <Link to="/home"><HomeIcon/></Link>
            <Link to="/users"><PeopleIcon/></Link>
            <Link to="/media"><MovieIcon/></Link>
            <Link to='/chat'><MessageIcon/></Link>
            <Link to='/friendslist'>Friends List</Link>
            <Link to ='/watchlist'>Watch List</Link>
          </div>
          <div className='nav-right'>
            <Link to={`/profile/${auth?.id}`} className='online'>{auth? <Avatar src={auth.avatarUrl}/>:<Avatar/>} {auth.username}</Link>
            <a href="#" onClick={handleClick}>Logout</a>
          </div>
        </>
      ) : (
        <div className='nav-right'>
          {/* The navbar will show these links before you log in */}
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
