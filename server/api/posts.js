const router = require('express').Router();
const {
  models: { Posts },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const posts = await Posts.findAll();
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const post = await Posts.create(req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const {postId, username} = req.body
    const post = await Posts.findByPk(postId)
    if(post.likes.includes(username)){
      const updatedLikes = post.likes.filter(item=>item !== username)
      await post.update({likes:updatedLikes})
    }else {
      const updatedLikes = [...post.likes, username]
      await post.update({likes:updatedLikes})
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
});
