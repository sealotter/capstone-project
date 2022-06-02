import React from 'react'
import { connect } from "react-redux";
import {compose} from 'redux'
import Pagination from '@material-ui/lab/Pagination';
import {loadMedia} from '../store'
import { withStyles } from '@material-ui/core/styles';
import {ImageList, ImageListItem, ImageListItemBar, ListSubheader, IconButton} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info';
import { Link } from "react-router-dom";
import MultipleSelect, {BasicSelects} from './Select';

const useStyles = (theme) => ({
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
});

class Media extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      media: 'movie',
      page: 1,
      with_genres: []
    }
  }

  componentDidUpdate(prevProps, prevState){
    const {loadMedia} = this.props
    if(prevState.media !== this.state.media) {
      loadMedia({...this.state})
    }
    if(prevState.with_genres !== this.state.with_genres) loadMedia({...this.state})
  }

  handleChangeValue = (val)=>{
    this.setState({media:val})
  }

  handleFilterValue = (val) =>{
    this.setState({with_genres:val})
  }

  render(){
    const {media, loadMedia, classes, genres} = this.props
    if(!media) return null
    if(!media.results) loadMedia({...this.state})
    let selectedGenres
    this.state.media === "movie"? selectedGenres = genres.movieGenres: selectedGenres= genres.tvGenres
    
    return (
      <div>
        <div style={{display:'flex'}}>
          <BasicSelects media={{movie:'Movies', tv:'TV Shows'}} onChangeValue={this.handleChangeValue}/>
          <MultipleSelect selectedGenres={selectedGenres} onChangeValue={this.handleFilterValue}/>
        </div>
        <div className={classes.root}>
        <ImageList rowHeight={500} className={classes.imageList} >
          <ImageListItem key="Subheader" cols={5} style={{ height:'300' }}>
            <ListSubheader component="div">Total results:{media.total_results>10000?10000:media.total_results}
              <Pagination count={media.total_pages>500?500:media.total_pages} reset={this.reset} onChange={(ev, page) => {
                this.setState({...this.state, page:page})
                loadMedia({...this.state, page})}}
              />
            </ListSubheader>
          </ImageListItem>
          {media.results?.map((item, idx) => (
            <ImageListItem key={idx} cols={5} style={{ width:'calc(20%-4px)', height:'65vh' }}>
              <Link to={`/${this.state.media}/${item.id}`}>
                <img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt={item.title} />
              </Link>
              <ImageListItemBar
                title={item.title}
                subtitle={<span>Rating: {item.vote_average}/10</span>}
                actionIcon={
                  <Link to={`/${this.state.media}/${item.id}`}>
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
}


const mapDispatch = (dispatch)=>{
  return{
    loadMedia: (search) =>{
      dispatch(loadMedia(search))
    }
  }
}

export default compose(
  connect(state=>state, mapDispatch),
  withStyles(useStyles)
)(Media)