import React from 'react';
import { connect } from 'react-redux';
import { findSingleMedia } from '../store';

const RatingsList = (props) => {
  console.log('rl props', props);
  const { ratings, auth, dbMedia } = props;
  const usersRatings =
    ratings.length && auth.id
      ? ratings.filter((rating) => {
          return rating.userId === auth.id;
        })
      : null;
  const ratingsList = usersRatings
    ? usersRatings.map((rating) => {
        const media = dbMedia
          ? dbMedia.find((media) => {
              return media.id === rating.mediaId;
            })
          : null;
        console.log(media);
        const mediaDisplay = media ? (
          <div>
            <img src={media.poster_path} />
            <div>{media.title}</div>
          </div>
        ) : null;
        return (
          <div key={rating.id}>
            <div>Rating: {rating.rating} stars</div>
            {mediaDisplay}
          </div>
        );
      })
    : null;

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
