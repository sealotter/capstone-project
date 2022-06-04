import React from 'react';
import { connect } from 'react-redux';
import { addFriend } from '../store/relationships';

const Profile = (props) => {
  console.log('state', props);

  const { auth, relationships } = props;

  const user = props.users.find((user) => {
    return user.id === parseInt(props.match.params.id);
  });
  console.log(user);
  const acceptedFriends = user
    ? relationships
        .filter((rel) => {
          return rel.senderId === user.id;
        })
        .filter((request) => request.status === 'accepted')
    : null;
  return (
    <div>
      <div>Wallpaper</div>
      <div>Profile Pic</div>
      <div>{user ? user.username : null}</div>
      <div>Bio, we can add this as part of the User db</div>
      <div> {acceptedFriends ? acceptedFriends.length : null} Friends</div>
      {/* need to change page to be the users id, based on who is logged in */}
      {/* <button onClick={() => props.addFriend(user.id, auth.id)}>
        Add Friend
      </button> */}
    </div>
  );
};
const mapDispatch = (dispatch) => {
  return {
    addFriend: async (senderId, recipientId) => {
      await dispatch(addFriend(senderId, recipientId));
    },
  };
};
export default connect((state) => state, mapDispatch)(Profile);
