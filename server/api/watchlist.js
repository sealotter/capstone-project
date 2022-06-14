const router = require('express').Router()
module.exports = router
const {models: {Watchlist, Media}} = require('../db')
require('dotenv').config();



router.get('/', async(req, res, next) => {
  try{
    const userList = await Watchlist.findAll()
    res.json(userList)
  }catch(err) {
    next(err)
  }
})

router.post('/', async(req, res, next) => {
 
  try{
  
    const { mediaId } = req.body

    let myMedia = await Media.findOne({
      where:{
      apiId:mediaId,
     }
    })
   let myList = await Watchlist.findOne({
     where: {
       mediaId: myMedia.id
      }
     })
     
    if(!myList) myList = await Watchlist.create({mediaId: myMedia.id})
    
  
    res.json(myList).status(201)

  }catch(err) {
    next(err)
  }
})


