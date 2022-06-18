import React from 'react';
import { connect } from 'react-redux';
import Post from './Post';

/**
 * COMPONENT
 */
const Home = (props) => {
  const {id, users, relationships, auth} = props;

  const myFriendRels = relationships.filter(rel=>(rel.senderId === auth.id || rel.recipientId === auth.id) && rel.status === 'accepted')
  // [rel, rel, rel]
  const friendsId = myFriendRels.map(rel=>rel.senderId === auth.id? rel.recipientId:rel.senderId)
  // [2, 3, 4]
  const friends = friendsId.map(id=>users.find(user=> user.id === id))
  // [anna, doug, angel]

  return (
    <div>
      <h3>Welcome, {auth.username}</h3>
      <Post friendsId={friendsId}/>
    </div>
  );
};

/**
 * CONTAINER
 */

export default connect(state=>state)(Home);
