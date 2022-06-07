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
  const ratingsList = findSingleMedia();
  console.log(usersRatings);
  return <div>Ratings List</div>;
};

const mapDispatch = (dispatch) => {
  return {
    findSingleMedia: (search) => dispatch(findSingleMedia(search)),
  };
};

export default connect((state) => state, mapDispatch)(RatingsList);
