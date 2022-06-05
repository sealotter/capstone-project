import React from 'react';
import { connect } from 'react-redux';

const FriendRequests = (props) => {
  console.log('FR props', props);
  const { user, relationships } = props;
  //need to finish getting incoming requests // outgoing requests to show
  const pendingRequests =
    user && relationships.length
      ? relationships
          .filter((rel) => {
            return rel.senderId === user.id || rel.recipientId === user.id;
          })
          .filter((request) => request.status === 'pending')
      : 0;
  const pendingRecipient = pendingRequests
    ? pendingRequests.map((request) => request.recipient.username)
    : null;
  const pendingSender = pendingRequests
    ? pendingRequests.map((request) => request.sender.username)
    : null;
  console.log(pendingRequests);
  console.log(pendingRecipient, pendingSender);
  return (
    <div>
      <div>Friend Requests</div>
      <div>Incoming: {}</div>
    </div>
  );
};

export default connect((state) => state)(FriendRequests);
