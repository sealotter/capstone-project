const router = require('express').Router()
module.exports = router
const {models: {Watchlist, Media, User}} = require('../db')
require('dotenv').config();

router.get('/', async(req, res, next) => {
 
  try{
    //const user = await User.findByToken(req.headers.authorization)
    const userList = await Watchlist.findAll( 
      //{
    //   where: {
    //     userId: user.id,
    //   }
      
    // }
    )

    res.json(userList)
  }catch(err) {
    next(err)
  }
})

router.post('/', async(req, res, next) => {
 
  try{

    const { mediaId, authId} = req.body
   // const {auth} = req.params.id
   

    let myMedia = await Media.findOne({
      where:{
      apiId:mediaId,
      
      
     }
    })

    //if(!myMedia) myMedia = await Media.create({userId:auth})
    
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


