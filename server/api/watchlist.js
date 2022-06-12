const router = require('express').Router()
module.exports = router
// require('dotenv').config();
const {models: {Watchlist, Media}} = require('../db')



router.get('/', async(req, res, next) => {
  try{
    const userList = Watchlist.findAll()
    res.json(userList)
  }catch(err) {
    next(err)
  }
})

router.post('/', async(req, res, next) => {
 
  try{
    const {mediaId} = req.body

    let myMedia = await Media.findOne({
      where:{
      apiId:mediaId
     }
    })

 
  let myList = await Watchlist.create({ mediaId: myMedia.id})

   
  
  res.json(myList).status(201)


   

  

  }catch(err) {
    next(err)
  }
})


