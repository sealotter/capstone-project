import React from 'react'
import { connect } from 'react-redux'
import {createList, removeWList} from '../store'
import Media from './Media'
import { Link } from 'react-router-dom'
import {loadWatchList} from '../store'
import GradeSharpIcon from '@material-ui/icons/GradeSharp';
import { Button } from '@material-ui/core';




class WatchList extends React.Component {
  constructor() {
    super()

  }

  render() {
    const { lists, dbMedia, match, destroy} = this.props
    const m = match.params.id*1
   
    return (
      <div>
        <ul>
            { lists.length === 0 ? (
              <div className='empty-content'>
                <h1>Your watchlist is currently empty</h1>
                <img src='../images/director.png' />
              </div>
              ) : (
                <div style={{width:'50%', marginTop: '50px', margin:'0 auto'}}>
                  {/* <h3>Here are your saved movies:</h3> */}
                  {lists.map(list => {
                    const WList = dbMedia.find((media => media.id === list.mediaId))
                    return(
        
                    <div className='watch-card' style={{margin: '50px'}} key = {list.id}>

                      <img
                          src={
                          WList.poster_path
                            ? `https://image.tmdb.org/t/p/w300/${WList.poster_path}`
                            : 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'
                          } />
                          
                        <div className='watch-content'>   
                          <span className ='rating'><GradeSharpIcon style = {{color : 'burlywood'}}/>{WList.vote_average}</span> 
                            <h1>{WList.title}</h1>
                            <p><span>{WList.overview}</span></p>
                           
                              
                            <Button className='postBox_button' onClick={() => destroy(list)}>Remove Movie </Button>
                        </div> 

                    </div>   
                
                    )
        
                    })}

                </div>
              )
            }
          </ul>
      </div>
      )
    }
} 

const mapDispatch = function(dispatch) {
  return {
    destroy: (list) => {
      dispatch(removeWList(list))
    },
    loadWatchList() {
      dispatch(loadWatchList())
    }
    
    
  }
}

const mapState = ( { lists, dbMedia, media}) => {
  return {
    lists,
    dbMedia,
    media,
    
  }
}


export default connect(mapState, mapDispatch)(WatchList)