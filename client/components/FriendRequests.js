import React from 'react';
import { connect } from 'react-redux';

const FriendRequests = (props) => {
  console.log('FR props', props);
  const { user, relationships } = props;
  const pendingFriends =
    user && relationships.length
      ? relationships
          .filter((rel) => {
            return rel.senderId === user.id;
          })
          .filter((request) => request.status === 'accepted')
      : 0;
  return <div>Friend Requests</div>;
};

export default connect((state) => state)(FriendRequests);
