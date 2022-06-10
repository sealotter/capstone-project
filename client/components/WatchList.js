import React from 'react'
import { connect } from 'react-redux'
import {loadWatchList} from '../store'
import SingleMedia from './SingleMedia'

class WatchList extends React.Component {
  constructor() {
    super();
    this.state = {
      list: []
    }
  
  }

  render() {
    const {list} = this.state
   
    return(
      <div>
        {/* <h1>Currently on your watch list:</h1> */}
        <ul>
          {
            list.length === 0 ? (
              <h3>Your watchlist is currently empty</h3>
            ) : (
              <div>
                <h3>Here are your saved movies:</h3>
                {list.map((m) => {
                  <SingleMedia
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

const mapDispatch = (dispatch) => {
  return{}
}

export default connect(state => state)(WatchList)