import React, { useState } from 'react';
import { connect } from 'react-redux';
import { sendRec } from '../store';
import { Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import PositionedSnackbar from './Snackbar'

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

    const onSubmit=(ev) => {
      ev.preventDefault();
      if(friendState) sendRec(friendState, auth?.id, media?.id);
    }

  return (

    <div className='recommendtofriend'>
      <FormControl
        onSubmit={onSubmit}
        style={{width:'200px'}}
      >
        <InputLabel id="recommend a friend">Recommend to a friend!</InputLabel>
        <Select
          labelId="recommend a friend"
          id="demo-simple-select"
          value={friendState ? friendState : ''}
          onChange={(ev) => setFriendState(ev.target.value)}
        >
          <MenuItem value={''}>Select Friend</MenuItem>
          {friends?.map((friend) => {
            const friendId =
              friend.senderId === auth.id
                ? friend.recipientId
                : friend.senderId;
            const fName = users?.find((user) => user.id === friendId)?.username;
            const recommendation = recommendations.find(rec => rec.userId === auth.id && rec.friendId === friendId*1 && rec.mediaId === thisMedia?.id)
            if(recommendation) return null
            return (
              <MenuItem value={friendId} key={friend.id}>
                {fName}
              </MenuItem>
            );
          })}
        </Select>
        <PositionedSnackbar handleParentClick={onSubmit} parentState={friendState} type={'recommendation'}/>
      </FormControl>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    sendRec: (friend, user, media) => dispatch(sendRec(friend, user, media)),
  };
};

export default connect((state) => state, mapDispatch)(Recommendations);
