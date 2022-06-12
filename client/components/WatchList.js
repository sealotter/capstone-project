import React from 'react'
import { connect } from 'react-redux'
import SingleMedia from './SingleMedia'
import {createList} from '../store'

class WatchList extends React.Component {
  constructor() {
    super();
    this.state = {
      lists: []
    }
  }
  componentDidMount() {
    
  
  
  }
  
  render() {
    const {lists} = this.state
    console.log(lists.length)
    
    return(
      <div>
        {/* <h1>Currently on your watch list:</h1> */}
        <ul>
          {
            lists.length === 0 ? (
              <h3>Your watchlist is currently empty</h3>
            ) : (
              <div>
                <h3>Here are your saved movies:</h3>
                {lists.map((l) => {
                  <SingleMedia
                    id = {l.mediaId}
                    title = {l.title}
                  />

                })}
              </div>
            )
          }
        </ul>
      </div>
    )
  }
}

const mapState = ( { lists }) => {
  return {
    lists
  }
}


export default connect(mapState)(WatchList)