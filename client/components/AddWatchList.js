
// import React from 'react'
// import { connect } from "react-redux";


// class AddWatchList extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       list: []
//     }
//     this.handleOnClick = this.handleOnClick.bind(this)
//   }
//   handleOnClick(media){
//     const {match:{params:{id}, path}, list} = this.props
//     console.log(list)
//     //cannot read properties of undefined -> adding button component to handle state
//     const l = list.find((l) => l.mediaId === media.id)
//     // console.log(l)
    
//     if(!l) {
//       this.props.createList(l.id, match.params.id*1)
//     }//else movie is already in list
//   }


//   render() {
//     const { media } = this.props
//     return(
//       <div>
//         <div className='watchBtn'>
//           <button onClick={() => this.handleOnClick(media)}>Add to Watch List</button>

//         </div>

//       </div>
//     )
//   }
// }


// const mapDispatch = (dispatch) => {
//   return {
//     createList: (list, mediaId) => {
//       dispatch(createList(list, mediaId))
//     }
//   }
// }


// export default connect(state=>state, mapDispatch)(AddWatchList)