const router = require('express').Router()
module.exports = router
const axios = require('axios')
require('dotenv').config();
const MOVIE_KEY = '8ffe0938c6774bbb929b412a3e840241'

router.get('/', async(req, res, next)=>{
  try{
    res.json('hi')
  }catch(err){
    next(err)
  }
})


router.get('/page/:page', async(req, res, next)=>{
  try{
    const movies = (await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_KEY }&page=${req.params.page}`)).data
    res.json(movies)
  }catch(err){
    next(err)
  }
})

router.get('/movie/:id', async(req, res, next)=>{
  try{
    const movie = (await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.REACT_APP_MOVIE_KEY }&language=en-US`)).data
    res.json(movie)
  }catch(err){
    next(err)
  }
})