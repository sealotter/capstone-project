const router = require('express').Router();
module.exports = router;
const {
  models: { Media },
} = require('../db');
const axios = require('axios');
require('dotenv').config();

router.get('/', async (req, res, next) => {
  try {
    const DBMedia = await Media.findAll();
    res.json(DBMedia);
  } catch (err) {
    next(err);
  }
});

router.get('/page/:page', async (req, res, next) => {
  try {
    const search = JSON.parse(req.headers.search);
    const { page } = req.params;
    let media;
    if (search.nameSearch) {
      media = (
        await axios.get(
          `https://api.themoviedb.org/3/search/${search.media}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=${page}&include_adult=false&query=${search.nameSearch}`
        )
      ).data;
    } else if (search.peopleSearch) {
      media = (
        await axios.get(
          `https://api.themoviedb.org/3/search/${search.media}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=${page}&include_adult=false&query=${search.peopleSearch}`
        )
      ).data;
    } else {
      let searchString = '';
      for (key in search) {
        if (key === 'with_genres')
          search[key].forEach((item, idx) => {
            if (idx === 0) searchString += `&${key}=${item.id}`;
            else searchString += `,${item.id}`;
          });
        else if (key !== 'page') searchString += `&${key}=${search[key]}`;
      }
      media = (
        await axios.get(
          `https://api.themoviedb.org/3/discover/${search.media}?api_key=${process.env.REACT_APP_MOVIE_KEY}${searchString}&page=${page}`
        )
      ).data;
    }
    res.json(media);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const search = JSON.parse(req.headers.search);
    const media = (
      await axios.get(
        `https://api.themoviedb.org/3/${search.media}/${req.params.id}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`
      )
    ).data;
    let ourData = await Media.findOne({
      where: {
        apiId: media.id,
      },
    });
    console.log(ourData)
    if (!ourData) ourData = await Media.create({ apiId: media.id, medium:search.media, poster_path:media.poster_path, title:media.title, overview:media.overview, homepage:media.homepage, vote_average:media.vote_average*1});
    res.json({ ...media, ...ourData });
  } catch (err) {
    next(err);
  }
});

router.get('/genres/:media', async (req, res, next) => {
  try {
    const genres = (
      await axios.get(
        `https://api.themoviedb.org/3/genre/${req.params.media}/list?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`
      )
    ).data;
    res.json(genres);
  } catch (err) {
    next(err);
  }

});

