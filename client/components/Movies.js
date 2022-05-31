import React from 'react'
import { connect } from "react-redux";
import Pagination from '@material-ui/lab/Pagination';
import {loadMovies} from '../store'
import { makeStyles } from '@material-ui/core/styles';
import {ImageList, ImageListItem, ImageListItemBar, ListSubheader, IconButton} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: '100vw',
    height: '100vh',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  }, 
}));

const Movies = ({movies, loadMovies})=>{
  const classes = useStyles()
  if(!movies) return null

  if(!movies.results) loadMovies()
  
  return (
    <div>
      <div className={classes.root}>
      <ImageList rowHeight={500} className={classes.imageList} >
        <ImageListItem key="Subheader" cols={5} style={{ height:'300' }}>
          <ListSubheader component="div">Total results:{movies.total_results}
            <Pagination count={movies.total_pages} onChange={(ev, page) => loadMovies(page)}/>
          </ListSubheader>
        </ImageListItem>
        {movies.results?.map((item, idx) => (
          <ImageListItem key={idx} cols={5} style={{ width:'calc(20%-4px)', height:'40vh' }}>
            <Link to={`/movies/${item.id}`}>
              <img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt={item.title} />
            </Link>
            <ImageListItemBar
              title={item.title}
              subtitle={<span>Rating: {item.vote_average}/10</span>}
              actionIcon={
                <Link to={`/movies/${item.id}`}>
                  <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
                    <InfoIcon /> Info
                  </IconButton>
                </Link>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
    </div>
  );
}


const mapDispatch = (dispatch)=>{
  return{
    loadMovies: (page) =>{
      dispatch(loadMovies(page))
    }
  }
}

export default connect(state=>state, mapDispatch)(Movies)