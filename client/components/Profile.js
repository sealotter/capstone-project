import React from "react";
import { connect } from "react-redux";
import { addFriend } from "../store/relationships";

const Profile = (props) => {
  console.log("state", props.state);
  const { auth, relationships } = props.state;

  const acceptedFriends = relationships
    .filter((rel) => {
      return rel.senderId === auth.id;
    })
    .filter((request) => request.status === "accepted");

  return (
    <div>
      <div>Wallpaper</div>
      <div>Profile Pic</div>
      <div>{auth.username}</div>
      <div>Bio, we can add this as part of the User db</div>
      <div> {acceptedFriends.length} Friends</div>
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
