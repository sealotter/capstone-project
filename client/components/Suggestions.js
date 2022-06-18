import React from 'react'
import { connect } from 'react-redux';
import auth from '../store/auth';

//highest average user rated media
const _HighestRated = (props)=>{
  const {dbMedia} = props
  if(!dbMedia.length) return null
  
  const mediaRatings = dbMedia.map(media=>{return {...media, averageRating:media.totalRating/media.numOfRatings}})

  mediaRatings.sort((a,b)=>b.averageRating-a.averageRating)
  
  const threeHighest = mediaRatings.slice(0,3)

  return(
    <div>
      The highest rated movies:
      <ul>
        {threeHighest.map(media=>{
          return <li key={media.id}>{media.title}</li>
        })}
      </ul>
    </div>
  )
}

//highest rated media by the logged in user
const _OwnTopRated = (props)=>{
  const {dbMedia, posts, auth} = props
  if(!dbMedia.length) return null
  const myRatings = posts.filter(post=> post.rating && post.userId === auth.id)
  myRatings.sort((a,b)=>b.rating-a.rating)
  const myRatedMedia = myRatings.map(rating=>dbMedia.find(media=>media.id === rating.mediaId))
  const threeHighest = myRatedMedia.slice(0,3)
  return(
    <div>
      Your highest rated movies:
      <ul>
        {threeHighest.map(media=>{
          return <li key={media.id}>{media.title}</li>
        })}
      </ul>
    </div>
  )
}

//most recently rated media
const _Trending = (props)=>{
  const {dbMedia, posts} = props
  if(!dbMedia.length) return null
  const ratings = posts.filter(post=> post.rating)
  const ratedMedia = ratings.map(rating=>dbMedia.find(media=>media.id === rating.mediaId))
  const trending = ratedMedia.slice(0,3)
  return(
    <div>
      Trending movies:
      <ul>
        {trending.map(media=>{
          return <li key={media.id}>{media.title}</li>
        })}
      </ul>
    </div>
  )
}


export const HighestRated = connect(state => state)(_HighestRated);
export const OwnTopRated = connect(state => state)(_OwnTopRated);
export const Trending = connect(state => state)(_Trending);

