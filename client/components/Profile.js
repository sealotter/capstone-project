import React from 'react';
import { connect } from 'react-redux';
import { addFriend } from '../store/relationships';
import FriendRequests from './FriendRequests';
import FriendsList from './FriendsList';

const Profile = (props) => {
  // console.log('profile props', props);

  const { auth, relationships } = props;

  const user = props.users.find((user) => {
    return user.id === parseInt(props.match.params.id);
  });
  // console.log(user);
  const acceptedFriends =
    user && relationships.length
      ? relationships
          .filter((rel) => {
            return rel.senderId === user.id || rel.recipientId === user.id;
          })
          .filter((request) => request.status === 'accepted')
      : 0;
  const ownPage = user ? user.id === auth.id : null;
  // addFriend (userId, authId) {
  //   return props.addFriend(userId, authId);
  // };
  return (
    <div>
      <div>Wallpaper</div>
      <div>Profile Pic</div>
      <div>{user ? user.username : null}</div>
      <div>Bio, we can add this as part of the User db</div>
      <div> {acceptedFriends ? acceptedFriends.length : null} Friends</div>
      {/* add friend button is setting acceptedFriends.length to null? */}
      <button
        disabled={ownPage}
        onClick={() => props.addFriend(auth.id, user.id)}
      >
        Add Friend
      </button>
      {ownPage ? <FriendsList /> : null}
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
