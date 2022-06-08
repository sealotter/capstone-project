const router = require('express').Router()
module.exports = router
// require('dotenv').config();
const {models: {WatchList}} = require('../db')



router.get('/', async(req, res, next) => {
  try{
    res.json('watchlisttt')
  }catch(err) {
    next(err)
  }
})

// router.post('/', async(req, res, next) => {
//   try{
   
//     res.send('hii')

//   }catch(err) {
//     next(err)
//   }
// })


