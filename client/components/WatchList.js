import React from 'react'
import { connect } from 'react-redux'
import SingleMedia from './SingleMedia'

class WatchList extends React.Component {
  constructor() {
    super();
    this.state = {
      lists: []
    }
  }
  
  render() {
    const {lists} = this.state
    console.log(lists)
   
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
                    id = {l.id}
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


export default connect((state) => state)(WatchList)