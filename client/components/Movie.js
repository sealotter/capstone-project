import React from 'react'
import { connect } from "react-redux";
import { findSingleMovie } from '../store'
import { Link } from "react-router-dom";

class Movie extends React.Component{

  componentDidMount(){
    const {findSingleMovie, match:{params:{id}}} = this.props
    if(this.props.movies.results) findSingleMovie(id)
  }

  componentDidUpdate(){
    const {findSingleMovie, match:{params:{id}}} = this.props
    if(this.props.movies.results) findSingleMovie(id)
  }

  render(){
    const {movies} = this.props
    if(!movies.id) return null
    

    const combineArr = (arr)=>{
      let str = ''
      arr.forEach((item, idx)=>{
        if(idx !== arr.length-1) str+= `${item.name}, `
        else str += `and ${item.name}`
      })
      return str
    }

    return(
      <div>
        <img src={`https://image.tmdb.org/t/p/w300/${movies.poster_path}`}/>
        <h1>{movies.title}</h1>
        <p>Genres: {combineArr(movies.genres)}</p>
        <p>Runtime: {movies.runtime} minutes</p>
        <p>Rating: {movies.vote_average}/10</p>
        <p>Release date: {movies.release_date}</p>
        <p>Budget: ${movies.budget}</p>
        <p>Revenue: ${movies.revenue}</p>
        <p>Produced by: {combineArr(movies.production_companies)}</p>
        <p>Website: <a href={`${movies.homepage}`}>{movies.homepage}</a></p>
        <p>Overview: {movies.overview}</p>
      </div>
    )
  }
}

const mapDispatch = (dispatch)=>{
  return{
    findSingleMovie: (id) =>{
      dispatch(findSingleMovie(id))
    }
  }
}

export default connect(state=>state, mapDispatch)(Movie)