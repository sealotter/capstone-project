import React from 'react';
import { connect } from 'react-redux';
import { addFriend } from '../store/relationships';
import FriendRequests from './FriendRequests';
import { Avatar } from '@material-ui/core';
import ProfileUpdate from './ProfileUpdate';
import Home from './Home';
import MuiNav from './muiNav';

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
  // addFriend (userId, authId) {
  //   return props.addFriend(userId, authId);
  // };

  const relExists = relationships.find(
    (rel) =>
      (rel.senderId === user?.id && rel.recipientId === auth.id) ||
      (rel.recipientId === user?.id && rel.senderId === auth.id)
  );

  return (
    <>
      {user?.id === auth.id ? (
        <div>
          <div>Wallpaper</div>
          <div>{<Avatar src={auth.avatarUrl} />}</div>
          <div>{auth.username}</div>
          <div>{auth.bio}</div>
          <div>
            {' '}
            {acceptedFriends.length === 1
              ? `${acceptedFriends.length} Friend`
              : `${acceptedFriends.length} Friends`}
          </div>
          <ul>
            {acceptedFriends.map((rel) => {
              const friendId =
                rel.senderId === id * 1 ? rel.recipientId : rel.senderId;
              const friend = users.find((user) => user.id === friendId);
              return <li key={rel.id}>{friend.username}</li>;
            })}
          </ul>
          {/* changed page to be the users id, based on who is logged in */}

          <FriendRequests user={user} />
          <Home />
          <ProfileUpdate match={props.match} />
        </div>
      ) : (
        <div>
          <div>Wallpaper</div>
          <div>
            <Avatar src={user?.avatarUrl} />
          </div>
          <div>{user?.username}</div>
          <button
            disabled={relExists}
            onClick={() => props.addFriend(auth.id, user.id)}
          >
            {relExists
              ? relExists.status === 'accepted'
                ? 'Already friends!'
                : 'Waiting for reply!'
              : 'Add Friend'}
          </button>
          <div>{user?.bio}</div>
          <div>
            {' '}
            {acceptedFriends.length === 1
              ? `${acceptedFriends.length} Friend`
              : `${acceptedFriends.length} Friends`}
          </div>
          <ul>
            {acceptedFriends.map((rel) => {
              const friendId =
                rel.senderId === id * 1 ? rel.recipientId : rel.senderId;
              const friend = users.find((user) => user.id === friendId);
              return <li key={rel.id}>{friend.username}</li>;
            })}
          </ul>
          <Home />
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

//props.addFriend(user.id, auth.id)
