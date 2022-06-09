const router = require('express').Router();
const {
  models: { Recommendations },
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
  console.log('MR post body', req.body);
  const senderId = req.body.senderId;
  const recipientId = req.body.recipientId;
  const mediaId = req.body.mediaId;
  try {
    const request = await Recommendations.create({
      senderId: senderId,
      recipientId: recipientId,
      mediaId: mediaId,
    });
    res.json(request).status(201);
  } catch (err) {
    next(err);
  }
});
