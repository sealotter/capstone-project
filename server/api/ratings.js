const router = require('express').Router()
module.exports = router
const {
  models: { Media, Ratings, User },
} = require('../db');
const axios = require('axios');


router.get('/', async(req, res, next)=>{
  try{

    res.json(await Ratings.findAll())

  }catch(err){
    next(err)
  }
})

router.post('/', async(req, res, next)=>{
  try{  
    const { authId, mediaId} = req.body
    let {rating} = req.body
    rating = rating*1
    let myMedia = await Media.findOne({
      where:{
        apiId:mediaId
      }
    })

    if(!myMedia) myMedia = await Media.create({apiId:mediaId})
    
    let myRating = await Ratings.findOne({
      where:{
        mediaId:myMedia.id,
        userId:authId
      }
    })
    
    if(!myRating){
      myRating = await Ratings.create({rating:rating, userId:authId, mediaId:myMedia.id})
      await myMedia.update({totalRating:myMedia.totalRating+rating, numOfRatings:myMedia.numOfRatings+1})
    }else{
      const currentRating = myRating.rating
      const newTotalRating = myMedia.totalRating - currentRating + rating
      await myMedia.update({totalRating:newTotalRating})
      await myRating.update({rating})
    }

    res.json(myRating)
  }catch(err){
    next(err)
  }
})