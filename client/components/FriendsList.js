import React from 'react'
import { connect } from "react-redux";
import { findSingleMovie } from '../store'

const FriendsList = ({auth, users, relationships})=>{
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
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const mapDispatch = (dispatch)=>{
  return{
    findSingleMovie: (id) =>{
      dispatch(findSingleMovie(id))
    }
  }
}

const mapState = ({auth, users, relationships})=>{
  return{
    auth,
    users,
    relationships
  }
}

export default connect(mapState, mapDispatch)(FriendsList)