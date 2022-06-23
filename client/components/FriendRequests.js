import React from 'react';
import { connect } from 'react-redux';
import { updateRelationship } from '../store';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const FriendRequests = (props) => {
  const { user, relationships, users, updateRelationship, auth, match } = props;

  if (!auth || !relationships) return null;

  const pendingFriends = relationships.filter(
    (rel) => rel.recipientId === auth.id && rel.status === 'pending'
  );

  return (
    <div>
      {pendingFriends.length} Friend Requests
      {pendingFriends.map((pending) => {
        const friend = users.find((user) => user.id === pending.senderId);
        return (
          <Card className="fr_card">
            <CardContent>
              <Link to={`/profile/${friend?.id}`}>{friend?.username}</Link>{' '}
              wants to be your friend!
              <Button
                onClick={() =>
                  updateRelationship(pending.senderId, auth.id, 'accept')
                }
              >
                Accept
              </Button>
              <Button
                onClick={() =>
                  updateRelationship(pending.senderId, auth.id, 'decline')
                }
              >
                Decline
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    updateRelationship: (recipientId, senderId, acceptDecline) => {
      dispatch(updateRelationship(recipientId, senderId, acceptDecline));
    },
  };
};

export default connect((state) => state, mapDispatch)(FriendRequests);
