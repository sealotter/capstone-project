const router = require('express').Router();
const {
  models: { Chat, User },
} = require('../db');
module.exports = router;

const Op = require("sequelize").Op;

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    const chats = await Chat.findAll({
      where:{
        [Op.or]: [{ user1Id: user.id }, { user2Id: user.id }],
      }
    });
    res.json(chats);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.body.authorization)
    const messages = JSON.stringify(req.body.chat)
    let chat = await Chat.findOne({
      where:{
        [Op.or]: [{ user1Id: user.id, user2Id:req.body.id }, { user2Id: user.id, user1Id:req.body.id }],
      }
    });
    
    if(!chat) chat = await Chat.create({messages:messages, user1Id:user.id, user2Id:req.body.id})
    else{await chat.update({messages:messages})}

    res.json(chat)
  } catch (err) {
    next(err);
  }
});