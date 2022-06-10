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
    let relationship = await Relationship.findOne({
      where:{
        senderId: senderId,
        recipientId: recipientId,
      }
    })

    if(!relationship){
      relationship = await Relationship.create({
        senderId: senderId,
        recipientId: recipientId,
      });
    }
    res.json(relationship).status(201);
  } catch (err) {
    next(err);
  }
});

router.put('/updateRelationship', async (req, res, next) => {
  try {
    const {senderId, recipientId, acceptDecline} = req.body

    const relationship = await Relationship.findOne({
      where:{
        senderId:senderId,
        recipientId:recipientId
      }
    })

    if(relationship && acceptDecline === 'accept'){
      await relationship.update({status:'accepted'})
      res.json(relationship).status(201);
    }
    if(relationship && acceptDecline === 'decline') {
      await relationship.destroy()
      res.sendStatus(204)
    }

  } catch (err) {
    next(err);
  }
});