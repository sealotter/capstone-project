import React from 'react';
import { connect } from 'react-redux';

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
            <img src={`https://image.tmdb.org/t/p/w300/${media.poster_path}`} />
            <div>{media.title}</div>
          </div>
        ) : null;
        return (
          <div key={rating.id}>
            {mediaDisplay}
            <div>Rating: {rating.rating} stars</div>
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

export default connect((state) => state)(RatingsList);
