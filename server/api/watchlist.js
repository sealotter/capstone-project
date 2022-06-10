const router = require('express').Router()
module.exports = router
// require('dotenv').config();
const {models: {List, Media}} = require('../db')



router.get('/', async(req, res, next) => {
  try{
    res.json('watchlisttt')
  }catch(err) {
    next(err)
  }
})

router.post('/', async(req, res, next) => {
  try{
   const MediaAdded = await List.create()
   let {list} = req.body
   let myMedia = await Media.findOne({
    where:{
      apiId : mediaId
    }
  })

  if(!myMedia) myMedia = await Media.create({apiId:mediaId})
  let myList = await List.findone({
    where: {
      mediaId: myMedia.id
    }
  })

  if(!myList) {
    myList = await List.create({list:list, mediaId: myMedia.id})
  }
  }catch(err) {
    next(err)
  }
})


