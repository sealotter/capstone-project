import React from 'react';
import { connect } from 'react-redux';
import { addFriend } from '../store/relationships';
import FriendRequests from './FriendRequests';
import { Avatar, Button } from '@material-ui/core';
import ProfileUpdate from './ProfileUpdate';
import Home from './Home';
import MuiNav from './MuiNav';
import { Link } from 'react-router-dom';
import Post from './Post'
import {HighestRated, OwnTopRated, Trending} from './Suggestions'

const Profile = (props) => {
  const {
    auth,
    relationships,
    users,
    match: {
      params: { id },
    },
  } = props;

  const user = users.find((user) => {
    return user.id === id * 1;
  });

  const acceptedFriends =
    user && relationships.length
      ? relationships.filter((rel) => {
          return (
            (rel.senderId === user.id || rel.recipientId === user.id) &&
            rel.status === 'accepted'
          );
        })
      : [];

  const relExists = relationships.find(
    (rel) =>
      (rel.senderId === user?.id && rel.recipientId === auth.id) ||
      (rel.recipientId === user?.id && rel.senderId === auth.id)
  );

  return (
    <>
      {user?.id === auth.id ? (
        <div>
          <HighestRated/>
          <br/>
          <OwnTopRated/>
          <br/>
          <Trending/>
          <br/>
          <div>Wallpaper</div>
          <div>{<Avatar src={auth.avatarUrl} />}</div>
          <div>{auth.username}</div>
          <div>{auth.bio}</div>
          <div>
            {' '}
            {acceptedFriends.length === 1 ? (
              <Link to="/friendsList">{acceptedFriends.length} Friend</Link>
            ) : (
              <Link to="/friendsList">{acceptedFriends.length} Friends</Link>
            )}
          </div>
          {/* <ul>
            {acceptedFriends.map((rel) => {
              const friendId =
                rel.senderId === id * 1 ? rel.recipientId : rel.senderId;
              const friend = users.find((user) => user.id === friendId);
              return <li key={rel.id}>{friend.username}</li>;
            })}
          </ul> */}
          {/* changed page to be the users id, based on who is logged in */}
          {/* do we need to change the FriendRequest functionality to use auth instead of user to make this a link without a prop? */}
          <Link to='/friendrequests'>Friend Requests</Link>
          <Post id={id}/>
        </div>
      ) : (
        <div>
          <div>Wallpaper</div>
          <div>
            <Avatar src={user?.avatarUrl} />
          </div>
          <div>{user?.username}</div>
          <Button
            disabled={relExists}
            onClick={() => props.addFriend(auth.id, user.id)}
          >
            {relExists
              ? relExists.status === 'accepted'
                ? 'Already friends!'
                : 'Waiting for reply!'
              : 'Add Friend'}
          </Button>
          <div>{user?.bio}</div>
          <div>
            {' '}
            {acceptedFriends.length === 1
              ? <Link to="/friendsList">{acceptedFriends.length} Friend</Link>
              : <Link to="/friendsList">{acceptedFriends.length} Friends</Link>
            }
          </div>
          <ul>
            {acceptedFriends.map((rel) => {
              const friendId =
                rel.senderId === id * 1 ? rel.recipientId : rel.senderId;
              const friend = users.find((user) => user.id === friendId);
              return <li key={rel.id}>{friend.username}</li>;
            })}
          </ul>
          <Post id={id}/>
          {/* changed page to be the users id, based on who is logged in */}
        </div>
      )}
    </>
  );
};
const mapDispatch = (dispatch) => {
  return {
    addFriend: (senderId, recipientId) => {
      dispatch(addFriend(senderId, recipientId));
    },
  };
};
export default connect((state) => state, mapDispatch)(Profile);

