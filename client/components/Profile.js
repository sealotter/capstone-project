import React from 'react';
import { connect } from 'react-redux';
import { addFriend } from '../store/relationships';
import FriendRequests from './FriendRequests';
import { Avatar } from '@material-ui/core';

const Profile = (props) => {
  console.log('state', props);

  const { auth, relationships, users, match: {params : {id} }} = props;

  const user = users.find((user) => {
    return user.id === id * 1
  });

  const acceptedFriends =
    user && relationships.length
      ? relationships
          .filter((rel) => {
            return rel.senderId === user.id || rel.recipientId === user.id && rel.status === 'accepted'
          })
      : [];
  // addFriend (userId, authId) {
  //   return props.addFriend(userId, authId);
  // };

  const temp = relationships.find(rel=>(rel.senderId === user?.id && rel.recipientId === auth.id) || (rel.recipientId === user?.id && rel.senderId === auth.id))
  return (
    <div>
      <div>Wallpaper</div>
      <div>{user? <Avatar src={user.avatarUrl}/> : null}</div>
      <div>{user ? user.username : null}</div>
      <div>{user? user.bio : 'fill out your bio!'}</div>
      <div> {acceptedFriends ? acceptedFriends.length : null} Friends</div>
      {/* changed page to be the users id, based on who is logged in */}
      <div>{user?.id !== auth.id ? <button disabled={temp} onClick={() => props.addFriend(auth.id, user.id)}>
        Add Friend
      </button> : null }</div>
      <FriendRequests user={user} />
    </div>
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
