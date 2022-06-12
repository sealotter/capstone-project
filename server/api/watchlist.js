const router = require('express').Router()
module.exports = router
const {models: {Watchlist, Media}} = require('../db')



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
    const {list, mediaId} = req.body

    let myMedia = await Media.findOne({
      where:{
      apiId:mediaId
     }
    })

    // let myList = await Watchlist.findOne({mediaId: myMedia.id})
    // if(!myList) {
      let myList = await Watchlist.create({ list: list, mediaId: myMedia.id})
    // }else {
    //   res.send('already in watchlist')
    // }

  res.json(myList).status(201)

  }catch(err) {
    next(err)
  }
})


