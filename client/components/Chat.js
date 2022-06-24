import io from 'socket.io-client'
import React, {useState} from 'react'
import Chatroom from './Chatroom'
import { connect } from 'react-redux';
import { Button, Grid, Box } from '@material-ui/core';
import Users from './Users'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


// const socket = io.connect(`http://localhost:8080`)
const socket = io.connect(`${process.env.WEBSITE}`)


function Chat(props){
  const [room, setRoom] = useState('')
  const [otherUser, setOtherUser] = useState({})
  const {users, auth, relationships, chats} = props
  const friendRels = relationships.filter(rel=> (rel.senderId === auth.id || rel.recipientId === auth.id) && rel.status === 'accepted')
  const friends = friendRels.map(rel=>rel.senderId === auth.id?users.find(user=>user.id === rel.recipientId):users.find(user=>user.id === rel.senderId))
  const joinRoom =(username, user)=>{
    const room = auth.id > user.id?`${auth.id}&${user.id}`:`${user.id}&${auth.id}`
    if(username !== '' && room !== ''){
      socket.emit('join_room', {room, username})
    }
  }
  
  if(!friends[0]) return <div>Add some friends to chat with!</div>

  return(
    <Box sx={{ flexGrow: 1, marginTop:'25px', paddingRight:'25px', paddingLeft:'25px' }}>
      <Grid container className="App" columns={12} style={{width:'50%', margin:'0 auto'}}>
        <Grid item xs={8}><Chatroom socket={socket} username={auth.username} otherUser={otherUser.id?otherUser:friends[0]} room={room?room:joinRoom(friends[0].username, friends[0])} /></Grid>
        <Grid item xs={4}>
          <Card style={{height:'63vh', border:'1px solid black', borderLeft:'none'}}>
            <CardContent>
              <List>
                {friends.map(user=>{
                  if(!user || user.id === auth.id) return null
                  const messagesList = chats.find(chat=> (chat.user1Id === user.id && chat.user2Id === auth.id) || (chat.user1Id === auth.id && chat.user2Id === user.id))
                  let messages
                  let showText
                  if(messagesList){
                    messages = JSON.parse(messagesList.messages)
                    const lastMessage = messages[messages.length -1].message
                    if(lastMessage.length >20) showText = `${lastMessage.slice(0,20)}...`
                    else showText = lastMessage
                  }
                  return(
                    <div key={user.id}>
                      <Button className = '.btn-grad' style={{minWidth:'100%', textTransform:'none'}} onClick={()=>{setRoom(auth.id>user.id?`${auth.id}&${user.id}`:`${user.id}&${auth.id}`), setOtherUser(user), joinRoom(auth.username, user)}}>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={`${user.avatarUrl}`} style={{backgroundColor:'linear-gradient(to right, #BF953F, #f7f1b1)'}} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={user.username.toUpperCase()}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  sx={{display:'inline'}}
                                  color="textPrimary"
                                >
                                
                                </Typography>
                                {showText?showText:null}
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      </Button>
                      <Divider variant="inset" component="li" />
                    </div>
                  )
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}


export default connect(state => state)(Chat)