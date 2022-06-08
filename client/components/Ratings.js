import React from 'react';
import { connect } from 'react-redux';
import { findSingleMedia } from '../store';

const RatingsList = (props) => {
  console.log('rl props', props);
  const { ratings, auth } = props;
  const usersRatings =
    ratings.length && auth.id
      ? ratings.filter((rating) => {
          return rating.userId === auth.id;
        })
      : null;
  const ratingsList = usersRatings
    ? usersRatings.map((rating) => {
        return (
          <div key={rating.id}>
            <div>Movie/ Show: {rating.mediaId}</div>
            <div>Rating: {rating.rating} stars</div>
          </div>
        );
      })
    : null;
  // console.log(usersRatings);
  //need help with calling findSingleMedia
  //want to get the name and picture of movie to display on ratings list
  return (
    <div>
      <div>Ratings List</div>
      <div>{ratingsList}</div>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    findSingleMedia: (search) => dispatch(findSingleMedia(search)),
  };
};

export default connect((state) => state, mapDispatch)(RatingsList);
