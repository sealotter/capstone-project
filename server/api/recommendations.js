const router = require('express').Router();
const {
  models: { Recommendations, Media },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    res.json(await Recommendations.findAll());
  } catch (err) {
    next(err);
  }
});
//addfriend API
router.post('/', async (req, res, next) => {
  const senderId = req.body.userId;
  const recipientId = req.body.friendId * 1;
  const mediaId = req.body.mediaId;
  try {
    const media = await Media.findOne({
      where: {
        apiId: mediaId,
      },
    });
    let rec = await Recommendations.findOne({
      where: {
        userId: senderId,
        friendId: recipientId,
        mediaId: media.id,
      },
    });
    if (!rec) {
      rec = await Recommendations.create({
        userId: senderId,
        friendId: recipientId,
        mediaId: media.id,
      });
    }

    res.json(rec).status(201);
  } catch (err) {
    next(err);
  }
});
