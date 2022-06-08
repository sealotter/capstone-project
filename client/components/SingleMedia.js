import React from 'react'
import { connect } from "react-redux";
import { findSingleMedia, createRating } from '../store'
import { Link } from "react-router-dom";

class SingleMedia extends React.Component{
  constructor(){
    super()
    this.state={
      rating:0
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
    const {media, auth, createRating} = this.props
    if(!media.id) return null

    const combineArr = (arr)=>{
      let str = ''
      if(arr.length === 1) return arr[0].name
      arr.forEach((item, idx)=>{
        if(idx !== arr.length-1) str+= `${item.name}, `
        else str += `and ${item.name}`
      })
      return str
    }
    const {rating} = this.state

    const ratings = [1, 2, 3, 4, 5]

    return(
      <div>
        <img src={media.poster_path?`https://image.tmdb.org/t/p/w300/${media.poster_path}`:'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'}/>
        <h1>{media.title}</h1>
        <p>Genres: {combineArr(media.genres)}</p>
        <p>Runtime: {media.runtime} minutes</p>
        <p>Rating: {media.vote_average}/10</p>
        <p>Release date: {media.release_date}</p>
        <p>Budget: ${media.budget}</p>
        <p>Revenue: ${media.revenue}</p>
        <p>Produced by: {combineArr(media.production_companies)}</p>
        <p>Website: {media.homepage?<a href={`${media.homepage}`}>{media.homepage}</a>:'N/A'}</p>
        <p>Overview: {media.overview}</p>
        <form onSubmit={(ev=>{
          ev.preventDefault()
          createRating(rating, auth.id, media.id)
        })}>
          <select onChange={ev=>{
            this.setState({rating:ev.target.value})
          }}>
            {ratings.map(rating=>{
              return <option key={rating} value ={rating}>{rating}</option>
            })}
          </select>
          <button type='submit'>Add Rating</button>
          
        </form>
        <form>
          
          
        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch)=>{
  return{
    findSingleMedia: (search) =>{
      dispatch(findSingleMedia(search))
    },
    createRating: (rating, authId, mediaId) => {
      dispatch(createRating(rating, authId, mediaId))
    },
    // addWatchlist: (media) => {
    //   dispatch(addWatchlist(media))
    // }
  }
}

export default connect(state=>state, mapDispatch)(SingleMedia)