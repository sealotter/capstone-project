import React from "react";
import { connect } from "react-redux";

const Profile = (state) => {
  console.log("state", state);
  const { auth, relationships } = state;

  const filteredRelationship = relationships.filter((rel) => {
    return rel.senderId === auth.id;
  });
  console.log(filteredRelationship);
  const friendsNumber = 0;
  filteredRelationship.forEach((request) => {
    return request.status === "accepted" ? friendsNumber + 1 : null;
  });
  console.log(friendsNumber);
  return (
    <div>
      <div>Wallpaper</div>
      <div>Profile Pic</div>
      <div>{auth.username}</div>
      <div>Bio, we can add this as part of the User db</div>
      <div>{friendsNumber} Friends</div>
      <button onClick={() => console.log("add friend")}>Add Friend</button>
    </div>
  );
};

export default connect((state) => state)(Profile);
