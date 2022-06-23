import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardActions, CardContent, Button, Typography, Avatar, Grid, Container, TextField} from '@material-ui/core'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addFriend } from '../store/relationships';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderRadius:25
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button:{
    display:'flex',
    alignItems:'center',
  }, 
  root2: {
    '& > *': {
      width: '25ch',
    },
  },
});

function Users(props) {
  const classes = useStyles();
  const { users, auth, relationships, addFriend } = props
  
  const [filter, setFilter] = useState('')
  
  const filterUsers =(filter, users)=>{
    return users.filter(user=> user.username.toLowerCase().includes(filter.toLowerCase()))
  }

  const searchUsers = filterUsers(filter, users)

  if(!users.length) return 'loading'

  return (
    <Container style={{paddingTop:'50px'}}>
      <TextField id="standard-basic" value={filter} label={`Search for people`} onChange={(ev)=> setFilter(ev.target.value)}/>
      <Button className={classes.button} onClick={()=>{setFilter('')}}>Reset</Button>
      <br/>
      <h1>Users:</h1>
      <Grid container spacing={4} style={{paddingTop:'50px'}}>
        {searchUsers.map(user=>{

          const relExists = relationships.find(rel=>(rel.senderId === user?.id && rel.recipientId === auth.id) || (rel.recipientId === user?.id && rel.senderId === auth.id))

          if(user.id === auth.id) return null
          return(
            <Grid item xs={12} md={6} lg={4} key={user.id}>
              <Card className={classes.root} variant="outlined" key={user.id} style={{width:'300px', height:'300px'}}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    <Link to={`/profile/${user.id}`}>{user.username}</Link>
                  </Typography>
                    <Avatar src={user.avatarUrl}/>
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
