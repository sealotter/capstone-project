const router = require('express').Router();
module.exports = router;
const {
  models: { Media, Ratings },
} = require('../db');
const axios = require('axios');

router.get('/', async (req, res, next) => {
  try {
    res.json('hi');
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  console.log('rating post req.body', req.body);
  try {
    const { authId, mediaId } = req.body;
    let { rating } = req.body;
    rating = rating * 1;
    let myMedia = await Media.findOne({
      where: {
        apiId: mediaId,
      },
    });

    if (!myMedia) myMedia = await Media.create({ apiId: mediaId });

    const newRating = await Ratings.create({
      rating: rating,
      userId: authId,
      mediaId: myMedia.id,
    });

    res.json(newRating);
  } catch (err) {
    next(err);
  }
});
