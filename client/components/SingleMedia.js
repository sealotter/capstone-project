import React from 'react';
import { connect } from 'react-redux';
import { findSingleMedia, createList, createPost, updatePostContent } from '../store';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Recommendations from './Recommendations';
import MultilineTextFields from './Textfield'
import { Button } from '@material-ui/core';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


class SingleMedia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
      
    };
    this.handleOnClick = this.handleOnClick.bind(this)
  }
  componentDidMount() {
    const {
      findSingleMedia,
      match: {
        params: { id },
        path,
      },
    } = this.props;
    const type =
      path.slice(1, 6) === 'movie' ? path.slice(1, 6) : path.slice(1, 3);
    if (this.props.media.results) findSingleMedia({ id, media: type });
  }

  componentDidUpdate() {
    const {
      findSingleMedia,
      match: {
        params: { id },
        path,
      }, lists
    } = this.props;
    const type =
      path.slice(1, 6) === 'movie' ? path.slice(1, 6) : path.slice(1, 3);
    if (this.props.media.results) findSingleMedia({ id, media: type });


  }

  handleOnClick(){
    const { match, lists, auth} = this.props
    this.props.createList(lists, match.params.id*1, auth.id)
  
  }

  render() {
    const {
      media,
      auth,
      users,
      createPost,
      posts,
      updatePostContent,
      lists,
      findSingleMedia,

      
      match: {
        params: { id },
        path,
      },
    } = this.props;
  
    const inWatchList = lists.find(l => l.mediaId === media.dataValues?.id)
   
    const ratings = posts.filter(post=>post?.rating !== null && post.mediaId === media.dataValues?.id)

    const type = path.slice(1, 6) === 'movie' ? path.slice(1, 6) : path.slice(1, 3);
    if (!media.id) return null;
    const myRating = ratings.find(
      (rating) =>
        rating?.mediaId === media.dataValues.id && rating?.userId === auth.id
    );

    
    const combineArr = (arr) => {
      let str = '';
      if (arr.length === 1) return arr[0].name;
      arr.forEach((item, idx) => {
        if (idx !== arr.length - 1) str += `${item.name}, `;
        else str += `and ${item.name}`;
      });
      return str;
    };

    return (
      <>
        <h2 className='singlemediatitle'>{media.title}</h2>
        <div className='singlemediacontainer'>
          <div className='singlemediaimage'>
            <img className='singlemediaposter'
              src={
                media.poster_path
                  ? `https://image.tmdb.org/t/p/w300/${media.poster_path}`
                  : 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'
              }
            />
            <div className='viewrating'>
              <h2>User ratings</h2>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Show what others thought!</Typography>
                </AccordionSummary>
                  {ratings.length
                    ? ratings.map((item) => {
                        return (
                          <AccordionDetails key={item.id}>
                            <Typography>
                              {users.find((user) => user.id === item.userId).username}{' '}
                              <Rating
                                name="Rated"
                                readOnly
                                value={item.rating ? item.rating : 0}
                                max={10}
                              />
                              {item.content?<p>{item.content}</p>:null}
                            </Typography>
                          </AccordionDetails>
                        );
                      })
                    : 'No ratings yet!'}
              </Accordion>
            </div>
          </div>
          <div className='singlemediacontent'>
            {/* <p>Genres: {combineArr(media.genres)}</p> */}
            <div className='genres'>
              <div><span className='category'>Genres: </span></div>
              <ul className='genrecontent'>
                {media.genres.map(genre=><li key={genre.id} className='singlegenre'>{genre.name}</li>)}
              </ul>
            </div>
            <p><span className='category'>Overview: </span>{media.overview}</p>
            <p><span className='category'>Runtime: </span> {media.runtime} Minutes</p>
            <p><span className='category'>Critic Rating: </span>{media.vote_average}/10</p>
            <p>
              <span className='category'>User Rating: </span>{' '}
              {media.dataValues.numOfRatings === 0
                ? 'Not rated yet!'
                : `${(
                    media.dataValues.totalRating / media.dataValues.numOfRatings
                  ).toFixed(1)}/10`}
            </p>
            <p><span className='category'>Release date: </span>{media.release_date}</p>
            <p><span className='category'>Produced by: </span>{combineArr(media.production_companies)}</p>
            <p id='website'>
              <span className='category'>Website: </span>{' '}
              {media.homepage ? (
                <a href={`${media.homepage}`}>{media.homepage}</a>
              ) : (
                'N/A'
              )}
            </p>
            <div className='selectContainer'>
              { !inWatchList ? (
                <div className='watchBtn'>
                  <Button onClick={() => this.handleOnClick()}>Add to Watch List</Button>      
                </div> 
                ) : (
                  <div className='watchBtn'>
                  <Button disable = 'true'>Already on Watch List</Button>       
                </div>
                )    
              }
              <div className='makerecommendation'>
                <Recommendations media={media} />
              </div>
            </div>
            <div className='makeratingcontainer'>
              <div className='makerating'>
                {myRating?
                  <>
                    <div>
                    <Typography component="legend">
                      <h2>Thanks for the rating!</h2>
                    </Typography>
                    <Rating
                      name="Rating"
                      value={myRating?.rating ? myRating.rating : 0}
                      max={10}
                      onChange={(ev) => {
                        createPost(null, auth.id, null, media.id, ev.target.value * 1);
                        findSingleMedia({id, media:type})
                      }}
                    />
                  </div>
                  <MultilineTextFields handleSubmit={updatePostContent} postId={myRating.id}/>
                  </>
                  :
                  <div>
                    <Typography component="legend">
                      <h2>Rate this movie!</h2>
                    </Typography>
                    <Rating
                      name="Rating"
                      value={myRating?.rating ? myRating.rating : 0}
                      max={10}
                      onChange={(ev) => {
                        createPost(null, auth.id, null, media.id, ev.target.value * 1);
                        findSingleMedia({id, media:type})
                      }}
                    />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapState = ({media, auth, ratings, users, lists, posts})=>{
  
  return{
    media,
    auth, 
    ratings, 
    users,
    lists, 
    posts
  }
}

const mapDispatch = (dispatch) => {
  return {
    findSingleMedia: (search) => {
      dispatch(findSingleMedia(search));
    },
    createRating: (rating, authId, mediaId) => {
      dispatch(createRating(rating, authId, mediaId))
    },
    createList: (list, mediaId, authId) => {
      dispatch(createList(list, mediaId, authId))
    },
    createPost:(content, userId, postId, mediaId, rating)=>{
      dispatch(createPost(content, userId, postId, mediaId, rating))
    },
    updatePostContent:(postId, content)=>{
      dispatch(updatePostContent(postId, content))
    }
  
  }
}



export default connect(mapState, mapDispatch)(SingleMedia);
