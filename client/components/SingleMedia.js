import React from 'react'
import { connect } from "react-redux";
import { findSingleMedia } from '../store'
import { Link } from "react-router-dom";

class SingleMedia extends React.Component{

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
    const {media} = this.props
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
      </div>
    )
  }
}

const mapDispatch = (dispatch)=>{
  return{
    findSingleMedia: (search) =>{
      dispatch(findSingleMedia(search))
    }
  }
}

export default connect(state=>state, mapDispatch)(SingleMedia)