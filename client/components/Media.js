import React from 'react'
import { connect } from "react-redux";
import {compose} from 'redux'
import Pagination from '@material-ui/lab/Pagination';
import {loadMedia} from '../store'
import { withStyles } from '@material-ui/core/styles';
import {ImageList, ImageListItem, ImageListItemBar, ListSubheader, IconButton, Box} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info';
import { Link } from "react-router-dom";
import MultipleSelect, {BasicSelects, SearchBox} from './Filters';


const useStyles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: '#F5F5F5'
  },
  imageList: {
    height:'100%',
    width: '100%'
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
      with_genres: [],
      genres:[],
      nameSearch:'',
      peopleSearch:''
    }
  }

  componentDidUpdate(prevProps, prevState){
    const {loadMedia, genres} = this.props
    if(prevState.media !== this.state.media) {
      loadMedia({...this.state, with_genres:[]})
      this.setState({...this.state, with_genres:[], page:1})
    }
    if(prevState.with_genres !== this.state.with_genres) loadMedia({...this.state})
    if(!prevProps.genres.movieGenres && genres.movieGenres) this.setState({genres:genres.movieGenres})
    if(prevState.nameSearch !== this.state.nameSearch) loadMedia({...this.state})
    if(prevState.peopleSearch !== this.state.peopleSearch) loadMedia({...this.state})
  }

  handleChangeValue = (val)=>{
    this.setState({media:val})
  }

  handleGenreChange = (val)=>{
    this.setState({with_genres:val, page:1})
  }

  handleNameSearchChange = (val)=>{
    this.setState({nameSearch:val})
  }

  handlePeopleSearchChange = (val)=>{
    this.setState({peopleSearch:val})
  }

  setNewGenres = ()=>{
    const {genres} = this.props
    let newGenres
    if(this.state.media === 'movie') newGenres = genres.movieGenres
    else newGenres = genres.tvGenres
    this.setState({genres:newGenres, with_genres:[]})
  }

  render(){
    const {media, loadMedia, classes, genres} = this.props
    if(!media || !genres.movieGenres || !genres.tvGenres) return null
    if(!media.results) loadMedia({...this.state})
  
    return (
      <div>
        <h1 style={{textAlign:'center', marginTop:'25px'}}>Search media</h1>
        <div style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
          <BasicSelects media={{movie:'Movies', tv:'TV Shows'}} onChangeValue={this.handleChangeValue}/>
          <SearchBox onChangeValue={this.handleNameSearchChange} genres={this.state.with_genres} peopleSearch={this.state.peopleSearch} searchBy={'title'}/>
          {/* <SearchBox onChangeValue={this.handlePeopleSearchChange} genres={this.state.with_genres} nameSearch={this.state.nameSearch} peopleSearch={this.state.peopleSearch} media={this.state.media} searchBy={'people'}/> */}
          <MultipleSelect genres={this.state.genres} media={this.state.media} nameSearch={this.state.nameSearch} peopleSearch={this.state.peopleSearch} setNewGenres={this.setNewGenres} onChangeValue={this.handleGenreChange}/>
        </div>
        <div className={classes.root}>
        <ImageList rowHeight={'auto'} gap={25} className={classes.imageList}>
          <ImageListItem key="Subheader" cols={5} style={{ height:'300' }}>
            <ListSubheader component="div">Total results:{media.total_results>10000?10000:media.total_results}
              <Pagination count={media.total_pages>500?500:media.total_pages} page={this.state.page} onChange={(ev, page) => {
                this.setState({ page:page})
                loadMedia({...this.state, page})}}
              />
            </ListSubheader>
          </ImageListItem>
          {media.results?.map((item, idx) => (
            <ImageListItem key={idx} className ='media-list' style={{ flex:'0 1 10%', padding: '2.5px'}}>
              <Link to={`/${this.state.media}/${item.id}`}>
                <img src={item.poster_path?`https://image.tmdb.org/t/p/w300/${item.poster_path}`:'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'} alt={item.title} style={{ height:'100%', borderRadius:'5px', maxWidth:'100%', maxHeight:'100%'}}/>
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