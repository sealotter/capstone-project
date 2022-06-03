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
