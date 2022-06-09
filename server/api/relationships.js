const router = require('express').Router();
const {
  models: { Relationship, User },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    console.log('REQ HEADERS', req.headers);
    const user = await User.findByToken(req.headers.authorization);
    console.log('user', user);
    res.json(
      await Relationship.findAll({
        where: {
          $or: [
            {
              senderId: user.id,
            },
            {
              recipientId: user.id,
            },
          ],
        },
      })
    );
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
