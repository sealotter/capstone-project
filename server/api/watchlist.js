const router = require('express').Router()
module.exports = router
const {models: {Watchlist, Media, User}} = require('../db')

router.get('/', async(req, res, next) => {
 
  try{
    const user = await User.findByToken(req.headers.authorization)
    const userList = await Watchlist.findAll( 
      {
      where: {
        userId: user.id,
       }
      }
    )

    res.json(userList)
  }catch(err) {
    next(err)
  }
})

router.post('/', async(req, res, next) => {
 
  try{

    const { mediaId, authId} = req.body
   

    let myMedia = await Media.findOne({
      where:{
      apiId:mediaId,
     }
    })
    
   let myList = await Watchlist.findOne({
     where: {
       mediaId: myMedia.id,
       userId: authId,
   
      }
     })
     
    if(!myList) myList = await Watchlist.create({mediaId: myMedia.id, userId: authId})
    
  
    res.json(myList).status(201)

  }catch(err) {
    next(err)
  }
})


