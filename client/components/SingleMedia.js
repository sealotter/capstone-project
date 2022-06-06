import React from 'react'
import { connect } from "react-redux";
import { findSingleMedia, createRating } from '../store'
import { Link } from "react-router-dom";
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

class SingleMedia extends React.Component{
  constructor(props){
    super(props)
    this.state={
      
    }
  }
  componentDidMount(){
    const {findSingleMedia, match:{params:{id}, path}} = this.props
    const type = path.slice(1,6)==='movie'?path.slice(1,6):path.slice(1,3)
    if(this.props.media.results) findSingleMedia({id, media:type})
  }

  componentDidUpdate(){
    const {findSingleMedia, match:{params:{id}, path}} = this.props
    const type = path.slice(1,6)==='movie'?path.slice(1,6):path.slice(1,3)
    if(this.props.media.results) findSingleMedia({id, media:type})
  }

  render(){
    const {media, auth, createRating, ratings, users, findSingleMedia, match:{params:{id}, path}} = this.props
    const type = path.slice(1,6)==='movie'?path.slice(1,6):path.slice(1,3)
    if(!media.id) return null
    const myRating = ratings.find(rating=> rating.mediaId === media.dataValues.id && rating.userId === auth.id)

    const combineArr = (arr)=>{
      let str = ''
      if(arr.length === 1) return arr[0].name
      arr.forEach((item, idx)=>{
        if(idx !== arr.length-1) str+= `${item.name}, `
        else str += `and ${item.name}`
      })
      return str
    }

    return(
      <div>
        <img src={media.poster_path?`https://image.tmdb.org/t/p/w300/${media.poster_path}`:'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'}/>
        <h1>{media.title}</h1>
        <p>Genres: {combineArr(media.genres)}</p>
        <p>Runtime: {media.runtime} minutes</p>
        <p>Critic Rating: {media.vote_average}/10</p>
        <p>User Rating: {media.dataValues.numOfRatings === 0?'Not rated yet!':`${(media.dataValues.totalRating/media.dataValues.numOfRatings).toFixed(1)}/10`}</p>
        <p>Release date: {media.release_date}</p>
        <p>Budget: ${media.budget}</p>
        <p>Revenue: ${media.revenue}</p>
        <p>Produced by: {combineArr(media.production_companies)}</p>
        <p>Website: {media.homepage?<a href={`${media.homepage}`}>{media.homepage}</a>:'N/A'}</p>
        <p>Overview: {media.overview}</p>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend"><h2>Rate this movie!</h2></Typography>
          <Rating name="Rating" value={myRating?.rating?myRating.rating:0} max={10} onChange={(ev)=>{
            createRating(ev.target.value*1, auth.id, media.id)
            findSingleMedia({id, media:type})
          }}/>
        </Box>  
        <ul>
          <h2>User ratings</h2>
          {ratings.length?ratings.map(item=>{
            return(
              <li key={item.id}>{users.find(user=>user.id ===item.userId).username} <Rating name="Rated" readOnly value={item.rating?item.rating:0} max={10}/></li>
            )
          }):"No ratings yet!"}
        </ul>
      </div>
    )
  }
}

const mapState = ({media, auth, ratings, users})=>{
  return{
    media,
    auth, 
    ratings, 
    users
  }
}

const mapDispatch = (dispatch)=>{
  return{
    findSingleMedia: (search) =>{
      dispatch(findSingleMedia(search))
    },
    createRating: (rating, authId, mediaId) => {
      dispatch(createRating(rating, authId, mediaId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleMedia)