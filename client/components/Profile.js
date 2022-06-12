import React from 'react';
import { connect } from 'react-redux';
import { addFriend } from '../store/relationships';
import FriendRequests from './FriendRequests';
import { Avatar,} from '@material-ui/core';
import ProfileUpdate from './ProfileUpdate';

const Profile = (props) => {
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
      <div>{user?.id === auth.id? <Avatar src={auth.avatarUrl}/> : <Avatar src={user?.avatarUrl}/>}</div>
      <div>{user?.id === auth.id ? auth.username : user?.username}</div>
      <div>{user?.id === auth.id ? auth.bio : user?.bio}</div>
      <div> {acceptedFriends ? acceptedFriends.length : null} Friends</div>
      {/* changed page to be the users id, based on who is logged in */}
      <div>{user?.id !== auth.id ? <button disabled={temp} onClick={() => props.addFriend(auth.id, user.id)}>
        Add Friend
      </button> : null }</div>
      <FriendRequests user={user} />
      <div>{user?.id === auth.id ? <ProfileUpdate match = {props.match}/>: null} </div>
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
