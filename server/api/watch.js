const router = require('express').Router()
module.exports = router
require('dotenv').config();




router.get('/', async(req, res, next) => {
  try{
    res.json('watch list')

  }catch(err) {
    next(err)
  }
})


