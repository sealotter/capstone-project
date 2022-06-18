import io from 'socket.io-client'
import React, {useState} from 'react'
import Chatroom from './Chatroom'
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';


const socket = io.connect(`http://localhost:8080`)


function Chat(props){
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)
  const [otherUser, setOtherUser] = useState({})
  const {users, auth} = props

  const joinRoom =(username, user)=>{
    const room = auth.id>user.id?`${auth.id}&${user.id}`:`${user.id}&${auth.id}`
    if(username !== '' && room !== ''){
      socket.emit('join_room', {room, username})
      setShowChat(true)
    }
  }

  const handleShowChat = ()=>{
    setShowChat(false)
  }
  
  return(
    <div className="App">
      {!showChat ? (
        <div>
          <ul>
            {users.map(user=>{
              if(user.id === auth.id) return null
              return(
                <Button key={user.id} onClick={()=>{setRoom(auth.id>user.id?`${auth.id}&${user.id}`:`${user.id}&${auth.id}`), setOtherUser(user), joinRoom(auth.username, user)}}>{user.username}</Button>
              )
            })}
          </ul>
        </div>
      ) : (
        <>
          <div>
            <ul>
              {users.map(user=>{
                if(user.id === auth.id) return null
                return(
                  <Button key={user.id} onClick={()=>{setRoom(auth.id>user.id?`${auth.id}&${user.id}`:`${user.id}&${auth.id}`), setOtherUser(user), joinRoom(auth.username, user)}}>{user.username}</Button>
                )
              })}
            </ul>
          </div>
          <Chatroom socket={socket} username={auth.username} otherUser={otherUser} room={room} handleShowChat={handleShowChat}/>
        </>
      )}
    </div>
  )
}

export default connect((state) => state)(Chat)