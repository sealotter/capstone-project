import React from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import AccSuggest from './AccSuggest';

/**
 * COMPONENT
 */
const Home = (props) => {
  const { id, users, relationships, auth } = props;

  const myFriendRels = relationships.filter(
    (rel) =>
      (rel.senderId === auth.id || rel.recipientId === auth.id) &&
      rel.status === 'accepted'
  );
  // [rel, rel, rel]
  const friendsId = myFriendRels.map((rel) =>
    rel.senderId === auth.id ? rel.recipientId : rel.senderId
  );
  // [2, 3, 4]
  const friends = friendsId.map((id) => users.find((user) => user.id === id));
  // [anna, doug, angel]

  return (
    <div className = "home">
      <div>
        <div>
          <h2 className='welcome'>Welcome, {auth.username}</h2>
        </div>
        <Post friendsId={friendsId} />
      </div>
      <div className="right">
        <AccSuggest />
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */

export default connect((state) => state)(Home);
