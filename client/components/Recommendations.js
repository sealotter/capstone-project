import React from 'react';
import { connect } from 'react-redux';
import { sendRec } from '../store';

const Recommendations = (props) => {
  console.log('rec props', props);
  const { sendRec, relationships, auth } = props;

  const friends = relationships
    ? relationships.filter((rel) => {
        return (
          (rel.senderId === auth.id || rel.recipientId === auth.id) &&
          rel.status === 'accepted'
        );
      })
    : null;
  console.log('friends', friends);
  return (
    <div>
      <form>
        <select>
          {friends
            ? friends.map((friend) => {
                return (
                  <option value={friend} key={friend.id}>
                    {' '}
                    {friend}
                  </option>
                );
              })
            : null}
        </select>
        <button onClick={() => sendRec()}> Reccomend</button>
      </form>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    sendRec: () => dispatch(sendRec()),
  };
};

export default connect((state) => state, mapDispatch)(Recommendations);
