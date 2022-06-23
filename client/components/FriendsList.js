import React from 'react';
import { connect } from 'react-redux';
import { updateRelationship } from '../store';
import { Link } from 'react-router-dom';
import { Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccSuggest from './AccSuggest';

const useStyles = makeStyles((theme) => ({
  root: {
    // flex: '5',
    width: '75%',
    marginTop: '50px',
    marginLeft: '15px',
    display: 'flex',
    margin: '0 auto',
    justifyContent: 'center',
    width: '90%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '18px',
  },
}));

const FriendsList = ({
  auth,
  users,
  relationships,
  updateRelationship,
  match,
}) => {
  console.log('match', match.params.id);
  if (!relationships.length || !auth.id || !users) return null;
  const friends = relationships.filter(
    (item) =>
      item.status === 'accepted' &&
      (item.recipientId === Number(match.params.id) ||
        item.senderId === Number(match.params.id))
  );
  console.log('friends', friends);
  const pendingFriends = relationships.filter(
    (item) => item.status === 'pending'
  );
  const pendingOut = pendingFriends.filter(
    (item) => item.senderId === Number(match.params.id)
  );
  const pendingIn = pendingFriends.filter(
    (item) => item.recipientId === Number(match.params.id)
  );

  const user = users.find((user) => user.id === Number(match.params.id));
  console.log('FL user', user);
  const classes = useStyles();

  return (
    <div className={classes.root} style={{margin: '0 auto', marginTop: '50px'}}>
      <div style={{width: '50%'}}>
        <Accordion className="fl_acc">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              className={classes.heading}
            >{`${user?.username}'s friends!`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ul>
                {friends.map((item, idx) => {
                  const friendId =
                    Number(match.params.id) === item.recipientId
                      ? item.senderId
                      : item.recipientId;
                  const friend = users.find((user) => user.id === friendId);
                  if (!friend) return null;
                  return (
                    <li key={idx}>
                      <Link to={`/profile/${friend.id}`}>
                        <Avatar
                          src={friend.avatarUrl}
                          style={{
                            backgroundColor:
                              'linear-gradient(to right, #BF953F, #f7f1b1)',
                          }}
                        />
                        {friend.username}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className="fl_acc">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>
              {`${user?.username}'s outgoing friend requests`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ul>
                {pendingOut.map((item, idx) => {
                  const friend = users.find(
                    (user) => user.id === item.recipientId
                  );
                  if (!friend) return null;
                  return (
                    <li key={idx}>
                      <Link to={`/profile/${friend.id}`}>
                        <Avatar src={friend.avatarUrl} />
                        {friend.username}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="fl_acc">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>
              {`${user?.username}'s incoming friend requests`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ul>
                {pendingIn.map((item, idx) => {
                  const friend = users.find(
                    (user) => user.id === item.senderId
                  );
                  if (!friend) return null;
                  return (
                    <li key={idx}>
                      <Link to={`/profile/${friend.id}`}>
                        <Avatar src={friend.avatarUrl} />
                        {friend.username}
                      </Link>
                      <Button
                        onClick={() =>
                          updateRelationship(item.senderId, auth.id, 'accept')
                        }
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() =>
                          updateRelationship(item.senderId, auth.id, 'decline')
                        }
                      >
                        Decline
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>

      <div style={{position: 'fixed', right: '90px', width: '15%', overflow: 'scroll', height: '90%', marginTop: '-50px'}}>
        <AccSuggest />
      </div>
    </div>
  );
};

const mapState = ({ auth, users, relationships }) => {
  return {
    auth,
    users,
    relationships,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateRelationship: (recipientId, senderId, acceptDecline) => {
      dispatch(updateRelationship(recipientId, senderId, acceptDecline));
    },
  };
};

export default connect(mapState, mapDispatch)(FriendsList);
