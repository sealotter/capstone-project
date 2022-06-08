const router = require('express').Router();
const {
  models: { Relationship },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    res.json(await Relationship.findAll());
  } catch (err) {
    next(err);
  }
});
//addfriend API
router.post('/addfriend', async (req, res, next) => {
  // console.log("post body", req.body);
  const senderId = req.body.senderId;
  const recipientId = req.body.recipientId;
  try {
    const request = await Relationship.create({
      senderId: senderId,
      recipientId: recipientId,
    });
    res.json(request).status(201);
  } catch (err) {
    next(err);
  }
});
