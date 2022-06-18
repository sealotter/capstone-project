const router = require('express').Router();
const { Op } = require("sequelize");
const {
  models: { Posts, Media },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const posts = await Posts.findAll({
      order:[['createdAt', 'DESC']]
    });
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {userId, mediaId, rating} = req.body
    
    let post
    if(mediaId && rating){
      let media = await Media.findOne({
        where:{
          id:mediaId
        }
      })
      if(!media) media = await Media.findOne({
        where:{
          apiId:mediaId
        }
      })

      post = await Posts.findOne({
        where:{
          [Op.and]:[
            {userId:userId},
            {mediaId:media.id}
          ]
        }
      })

      if(post) {
        const newTotalRating = media.totalRating - post.rating + rating
        await post.update({rating:rating})
        await media.update({totalRating:newTotalRating})
      }
      else {
        const newNumOfRatings = media.numOfRatings +1
        const newTotalRating = media.totalRating + rating*1
        await media.update({numOfRatings:newNumOfRatings, totalRating:newTotalRating})
        post = await Posts.create({...req.body, mediaId:media.id})
      }
    }
    else post = await Posts.create({...req.body});
    res.json(post);
  } catch (err) {
    next(err);
  }
});

router.put('/likes', async (req, res, next) => {
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

router.put('/content', async (req, res, next) => {
  try {
    const {postId, content} = req.body
    const post = await Posts.findByPk(postId)
    await post.update({content:content})
    res.json(post);
  } catch (err) {
    next(err);
  }
});
