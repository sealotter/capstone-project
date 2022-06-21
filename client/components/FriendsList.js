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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const FriendsList = ({ auth, users, relationships, updateRelationship }) => {
  if (!relationships.length || !auth.id || !users) return null;
  const friends = relationships.filter(
    (item) =>
      item.status === 'accepted' &&
      (item.recipientId === auth.id || item.senderId === auth.id)
  );
  const pendingFriends = relationships.filter(
    (item) => item.status === 'pending'
  );
  const pendingOut = pendingFriends.filter((item) => item.senderId === auth.id);
  const pendingIn = pendingFriends.filter(
    (item) => item.recipientId === auth.id
  );
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            className={classes.heading}
          >{`${auth.username}'s friends!`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul>
              {friends.map((item, idx) => {
                const friendId =
                  auth.id === item.recipientId
                    ? item.senderId
                    : item.recipientId;
                const friend = users.find((user) => user.id === friendId);
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            {`${auth.username}'s outgoing friend requests`}
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

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            {`${auth.username}'s incoming friend requests`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul>
              {pendingIn.map((item, idx) => {
                const friend = users.find((user) => user.id === item.senderId);
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
  );
};

// const FriendsList = ({ auth, users, relationships, updateRelationship }) => {
//   if (!relationships.length || !auth.id || !users) return null;
//   const friends = relationships.filter(
//     (item) =>
//       item.status === 'accepted' &&
//       (item.recipientId === auth.id || item.senderId === auth.id)
//   );
//   const pendingFriends = relationships.filter(
//     (item) => item.status === 'pending'
//   );
//   const pendingOut = pendingFriends.filter((item) => item.senderId === auth.id);
//   const pendingIn = pendingFriends.filter(
//     (item) => item.recipientId === auth.id
//   );
//   return (
//     <div>
//       {`${auth.username}'s friends!`}
//       <ul>
//         {friends.map((item, idx) => {
//           const friendId =
//             auth.id === item.recipientId ? item.senderId : item.recipientId;
//           const friend = users.find((user) => user.id === friendId);
//           if (!friend) return null;
//           return (
//             <li key={idx}>
//               <Link to={`/profile/${friend.id}`}>{friend.username}</Link>
//             </li>
//           );
//         })}
//       </ul>

// {`${auth.username}'s outgoing friend requests`}
// <ul>
//   {pendingOut.map((item, idx) => {
//     const friend = users.find((user) => user.id === item.recipientId);
//     if (!friend) return null;
//     return (
//       <li key={idx}>
//         <Link to={`/profile/${friend.id}`}>{friend.username}</Link>
//       </li>
//     );
//   })}
// </ul>

// {`${auth.username}'s incoming friend requests`}
// <ul>
//   {pendingIn.map((item, idx) => {
//     const friend = users.find((user) => user.id === item.senderId);
//     if (!friend) return null;
//     return (
//       <li key={idx}>
//         <Link to={`/profile/${friend.id}`}>{friend.username}</Link>
//         <Button
//           onClick={() =>
//             updateRelationship(item.senderId, auth.id, 'accept')
//           }
//         >
//           Accept
//         </Button>
//         <Button
//           onClick={() =>
//             updateRelationship(item.senderId, auth.id, 'decline')
//           }
//         >
//           Decline
//         </Button>
//       </li>
//     );
//   })}
// </ul>
//     </div>
//   );
// };

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
