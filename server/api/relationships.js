const router = require('express').Router()
const { models: { Relationship }} = require('../db')
module.exports = router

router.get('/', async(req, res, next)=>{
  try{
    res.json(await Relationship.findAll())
  }catch(err){
    next(err)
  }
})