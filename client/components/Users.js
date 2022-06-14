import React, {useState, useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardActions, CardContent, Button, Typography, Avatar, Grid, Container, TextField} from '@material-ui/core'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addFriend } from '../store/relationships';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button:{
    display:'flex',
    alignItems:'center'
  }, 
  root2: {
    '& > *': {
      width: '25ch',
    },
  },
});

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Users(props) {
  const classes = useStyles();
  const { users, auth, relationships } = props
  const prevUsers = usePrevious(users)
  
  const [filter, setFilter] = useState('')
  const [searchUsers, setSearchUsers] = useState(users)

  useEffect(() => {
    if(!prevUsers?.length && users.length) setSearchUsers(users)
  })

  if(!users.length) return 'loading'
  return (
    <Container style={{paddingTop:'50px'}}>
      <TextField id="standard-basic" value={filter} label={`Search for people`} onChange={(ev)=> {
          setFilter(ev.target.value) 
          setSearchUsers(users.filter(user=>user.username.includes(ev.target.value)))
        }}/>
      <Button className={classes.button} onClick={()=>{setFilter(''); setSearchUsers(users)}}>Reset</Button>
      <br/>
      <h1>Users:</h1>
      <Grid container spacing={4} style={{paddingTop:'50px'}}>
        {searchUsers.map(user=>{

          const relExists = relationships.find(rel=>(rel.senderId === user?.id && rel.recipientId === auth.id) || (rel.recipientId === user?.id && rel.senderId === auth.id))

          if(user.id === auth.id) return null
          return(
            <Grid item xs={6} md={4} lg={3} key={user.id}>
              <Card className={classes.root} variant="outlined" key={user.id} style={{width:'300px'}}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    <Link to={`/profile/${user.id}`}>{user.username}</Link>
                  </Typography>
                    <Avatar src={auth.avatarUrl}/>
                  <Typography variant="body2" component="p">
                    User Bio:
                    <br/>
                    {user.bio}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" disabled={relExists?true:false} onClick={() => addFriend(auth.id, user.id)}>{relExists? relExists.status ==='accepted'?'Already friends!':'Waiting for reply!':'Add Friend'}</Button>
                </CardActions>
              </Card>
            </Grid>   
          )
        })}   
      </Grid>
    </Container>
  );
}

const mapDispatch = (dispatch) => {
  return {
    addFriend: (senderId, recipientId) => {
      dispatch(addFriend(senderId, recipientId));
    },
  };
};

export default connect((state) => state, mapDispatch)(Users);
