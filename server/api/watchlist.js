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
   
  //  const MediaAdded = await List.create()
  // const list = await List.create(req.body) 
  // res.json(list)
  const {mediaId, list} = req.body
  

  //  const idContext = req.body.idNewList
  let myMedia = await Media.findOne({
    where:{
      apiId:mediaId
    }
  })

  if(!myMedia) {
    myMedia = await Media.create({apiId:mediaId})
  }
 

 

  // let myList = await List.findOne({
  //   where: {
  //     mediaId: myMedia.id
  //   }
  // })



 
  let myList = await Watchlist.create({list:list, mediaId:myMedia.id})

   
  
  res.json(myList)


   

  

  }catch(err) {
    next(err)
  }
})


