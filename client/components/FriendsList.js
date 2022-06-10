import React from 'react'
import { connect } from "react-redux";
import {updateRelationship} from '../store'

const FriendsList = ({auth, users, relationships, updateRelationship})=>{
  if(!relationships.length || !auth.id || !users) return null
  const friends = relationships.filter(item=> item.status === 'accepted' && (item.recipientId === auth.id || item.senderId === auth.id))
  const pendingFriends = relationships.filter(item=> item.status === 'pending')
  const pendingOut = pendingFriends.filter(item=> item.senderId === auth.id)
  const pendingIn = pendingFriends.filter(item=> item.recipientId === auth.id)
  return(
    <div>
      {`${auth.username}'s friends!`}
      <ul>
        {friends.map((item, idx)=>{
          const friendId = auth.id ===item.recipientId?item.senderId:item.recipientId
          const friend = users.find(user => user.id ===friendId)
          return(
            <li key={idx}>
              {friend?.username}
            </li>
          )
        })}
      </ul>
        
      {`${auth.username}'s outgoing friend requests`}
      <ul>
        {pendingOut.map((item, idx)=>{
          const friend = users.find(user=> user.id === item.recipientId)
          return(
            <li key={idx}>
              {friend?.username}
            </li>
          )
        })}
      </ul>

      {`${auth.username}'s incoming friend requests`}
      <ul>
        {pendingIn.map((item, idx)=>{
          const friend = users.find(user=> user.id === item.senderId)
          return(
            <li key={idx}>
              {friend?.username}
              {console.log(item)}
              <button onClick={()=>updateRelationship(item.senderId, auth.id, 'accept')}>Accept</button>
              <button onClick={()=>updateRelationship(item.senderId, auth.id, 'decline')}>Decline</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}


const mapState = ({auth, users, relationships})=>{
  return{
    auth,
    users,
    relationships
  }
}

const mapDispatch = (dispatch) =>{
  return{
    updateRelationship: (recipientId, senderId, acceptDecline) =>{
      dispatch(updateRelationship(recipientId, senderId, acceptDecline))
    }
  }
}

export default connect(mapState, mapDispatch)(FriendsList)