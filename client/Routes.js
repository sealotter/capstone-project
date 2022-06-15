import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {
  me,
  loadMedia,
  loadRelationships,
  loadUsers,
  loadGenres,
  loadPosts,
  loadRatings,
  loadDBMedia,
  loadRecommendations,
  loadChats,
  loadWatchList
} from './store';
import FriendsList from './components/FriendsList';
import SingleMedia from './components/SingleMedia';
import Media from './components/Media';
import Profile from './components/Profile';
import Users from './components/Users';
import FriendRequests from './components/FriendRequests';
import WatchList from './components/WatchList';
import Ratings from './components/Ratings';
import Recommendations from './components/Recommendations';
import Chat from './components/Chat'


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  componentDidUpdate(prevProps){
    if(!prevProps.isLoggedIn && this.props.isLoggedIn) this.props.loadChats()
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/users" component={Users} />
            <Route path="/profile/:id" component={Profile} />
            {/* <Route path="/profile"  component={Profile} /> */}
            <Route path="/friendrequests" component={FriendRequests} />
            <Route path="/friendsList" component={FriendsList} />
            <Route path="/media" exact component={Media} />
            <Route path="/movie/:id" component={SingleMedia} />
            <Route path="/tv/:id" component={SingleMedia} />
            <Route path = '/watchlist' component={WatchList} />
            <Route path="/ratings" component={Ratings} />
            <Route path="/recommendations" component={Recommendations} />
            <Route path='/chat' component={Chat}/>
            <Redirect to="/home" />
            {/* <Redirect to="/home" /> */}

          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/media" exact component={Media} />
            <Route path="/movie/:id" component={SingleMedia} />
            <Route path="/tv/:id" component={SingleMedia} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(loadMedia());
      dispatch(loadRelationships());
      dispatch(loadUsers());
      dispatch(loadPosts());
      dispatch(loadGenres());
      dispatch(loadRatings());
      dispatch(loadDBMedia());
      dispatch(loadRecommendations());
      dispatch(loadWatchList())
    },
    loadChats(){
      dispatch(loadChats())
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
