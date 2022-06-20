import io from 'socket.io-client'
import React, {useState} from 'react'
import Chatroom from './Chatroom'
import { connect } from 'react-redux';
import { Button, Grid, Box } from '@material-ui/core';
import Users from './Users'


// const socket = io.connect(`http://localhost:8080`)
const socket = io.connect(`${process.env.WEBSITE}`)


function Chat(props){
  const [room, setRoom] = useState('')
  const [otherUser, setOtherUser] = useState({})
  const {users, auth, relationships, chats} = props
  const friendRels = relationships.filter(rel=> (rel.senderId === auth.id || rel.recipientId === auth.id) && rel.status === 'accepted')
  const friends = friendRels.map(rel=>rel.senderId === auth.id?users.find(user=>user.id === rel.recipientId):users.find(user=>user.id === rel.senderId))
  console.log(friendRels)
  const joinRoom =(username, user)=>{
    const room = auth.id > user.id?`${auth.id}&${user.id}`:`${user.id}&${auth.id}`
    if(username !== '' && room !== ''){
      socket.emit('join_room', {room, username})
    }
  }
  
  if(!friends[0]) return <div>Add some friends to chat with!</div>

  return(
    <Box sx={{ flexGrow: 1 }}>
      <Grid container className="App" columns={12}>
        <Grid item xs={8}><Chatroom socket={socket} username={auth.username} otherUser={otherUser.id?otherUser:friends[0]} room={room?room:joinRoom(friends[0].username, friends[0])} /></Grid>
        <Grid item xs={4}>
          <Box sx={{display:'flex', flexDirection:'column'}}>
            {friends.map(user=>{
              if(!user || user.id === auth.id) return null
              const messagesList = chats.find(chat=> (chat.user1Id === user.id && chat.user2Id === auth.id) || (chat.user1Id === auth.id && chat.user2Id === user.id))
              let messages
              let showText
              if(messagesList){
                messages = JSON.parse(messagesList.messages)
                const lastMessage = messages[messages.length -1].message
                if(lastMessage.length >50) showText = `${lastMessage.slice(0,50)}...`
                else showText = lastMessage
              }
              return(
                <Button className='chatButton' key={user.id} onClick={()=>{setRoom(auth.id>user.id?`${auth.id}&${user.id}`:`${user.id}&${auth.id}`), setOtherUser(user), joinRoom(auth.username, user)}} style={{display:'block'}}>{user.username}<br/>{showText?<p className="lastMessage">{showText}</p>:null}</Button>
              )
            })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}


export default connect(state => state)(Chat)