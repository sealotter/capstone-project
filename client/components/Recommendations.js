import React, { useState } from 'react';
import { connect } from 'react-redux';
import { sendRec } from '../store';

const Recommendations = (props) => {
  const [friendState, setFriendState] = React.useState(null);
  const { sendRec, relationships, auth, users, media, recommendations, dbMedia } = props;
  const thisMedia = dbMedia.find(med => med.apiId === media.id)

  const friends = relationships
    ? relationships.filter((rel) => {
        return (
          (rel.senderId === auth.id || rel.recipientId === auth.id) &&
          rel.status === 'accepted'
        );
      })
    : null;

  return (
    <div>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();

          sendRec(friendState, auth?.id, media?.id);
        }}
      >
        <select
          value={friendState ? friendState : ''}
          onChange={(ev) => setFriendState(ev.target.value)}
        >
          <option value={''}>Select Friend</option>
          {friends?.map((friend) => {
            const friendId =
              friend.senderId === auth.id
                ? friend.recipientId
                : friend.senderId;
            const fName = users?.find((user) => user.id === friendId)?.username;
            const recommendation = recommendations.find(rec => rec.userId === auth.id && rec.friendId === friendId*1 && rec.mediaId === thisMedia?.id)
            if(recommendation) return null
            return (
              <option value={friendId} key={friend.id}>
                {fName}
              </option>
            );
          })}
        </select>
        <button> Recommend</button>
      </form>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    sendRec: (friend, user, media) => dispatch(sendRec(friend, user, media)),
  };
};

export default connect((state) => state, mapDispatch)(Recommendations);
