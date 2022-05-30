import React from 'react'
import { connect } from "react-redux";
import Pagination from '@material-ui/lab/Pagination';
import {loadMovies} from '../store'

const Movies = ({movies, loadMovies})=>{
  if(!movies) return null

  return(
    <div>
      <ul>
        <Pagination className='pagination' count={33733} onChange={(ev, page) => loadMovies(page)} />
        Total results:{movies.total_results}
        {movies.results?.map((movie, idx)=>{
          return(
            <li key ={idx}>
              <div>
                <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}></img>
                <div>Title: {movie.title}</div>
                <p>Description: {movie.overview}</p>
                <div>Rating: {movie.vote_average}/10</div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>

  )
}


const mapDispatch = (dispatch)=>{
  return{
    loadMovies: (page) =>{
      dispatch(loadMovies(page))
    }
  }
}

export default connect(state=>state, mapDispatch)(Movies)