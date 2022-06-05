const router = require('express').Router()
module.exports = router
const {
  models: { Media },
} = require('../db');
const axios = require('axios');
require('dotenv').config();

router.get('/', async(req, res, next)=>{
  try{
    res.json('hi')
  }catch(err){
    next(err)
  }
})

router.get('/page/:page', async(req, res, next)=>{
  try{
    const search = JSON.parse(req.headers.search)
    const {page} = req.params
    let searchString = ''
    for(key in search){
      if(key === 'with_genres') search[key].forEach((item, idx)=> {
        if(idx === 0) searchString += `&${key}=${item.id}`
        else searchString += `,${item.id}`
      })
      else if(key!=='page') searchString += `&${key}=${search[key]}`
    }
    const movies = (await axios.get(`https://api.themoviedb.org/3/discover/${search.media}?api_key=${process.env.REACT_APP_MOVIE_KEY }${searchString}&page=${page}`)).data
    res.json(movies)
  }catch(err){
    next(err)
  }
})

router.get('/:id', async(req, res, next)=>{
  try{
    const search = JSON.parse(req.headers.search)
    const media = (await axios.get(`https://api.themoviedb.org/3/${search.media}/${req.params.id}?api_key=${process.env.REACT_APP_MOVIE_KEY }&language=en-US`)).data
    let ourData = await Media.findOne({
      where:{
        apiId:media.id
      }
    })
    if(!ourData) ourData = await Media.create({apiId:media.id})
    res.json({...media, ...ourData})
  }catch(err){
    next(err)
  }
})

router.get('/genres/:media', async(req, res, next)=>{
  try{
    const genres = (await axios.get(`https://api.themoviedb.org/3/genre/${req.params.media}/list?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`)).data
    res.json(genres)
  }catch(err){
    next(err)
  }
})