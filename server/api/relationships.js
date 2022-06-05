const router = require('express').Router();
const {
  models: { Relationship, User },
} = require('../db');
module.exports = router;

//add filtering for only related requests
router.get('/', async (req, res, next) => {
  try {
    const relationships = await Relationship.findAll();
    const senders = await User.findAll({
      where: {
        id: relationships.map((rel) => rel.senderId),
      },
    });
    const recipients = await User.findAll({
      where: {
        id: relationships.map((rel) => rel.recipientId),
      },
    });
    const result = relationships.map((rel) => {
      const sender = senders.find((sender) => sender.id === rel.senderId);
      const recipient = recipients.find(
        (recipient) => recipient.id === rel.recipientId
      );
      return {
        ...rel.dataValues,
        sender,
        recipient,
      };
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
});
//addfriend API
router.post('/addfriend', async (req, res, next) => {
  console.log('post body', req.body);
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
