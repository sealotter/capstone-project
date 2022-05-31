const router = require('express').Router()
module.exports = router
const axios = require('axios')
require('dotenv').config();

router.get('/', async(req, res, next)=>{
  try{
    res.json('hi')
  }catch(err){
    next(err)
  }
})

router.get('/:page', async(req, res, next)=>{
  try{
    const movies = (await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_KEY }&page=${req.params.page}`)).data
    res.json(movies)
  }catch(err){
    next(err)
  }
})