const Sequelize = require("sequelize");
const db = require("../db");

const Media = db.define("media", {
  apiId: {
    type: Sequelize.INTEGER
  },
  //movie/ show/ documentary/ etc..
  medium: {
    type: Sequelize.ENUM(['movie', 'show']),
  },
  //where to watch
  service: {
    type: Sequelize.STRING,
  },
  totalRating: {
    type: Sequelize.INTEGER,
    defaultValue:0
  },
  numOfRatings: {
    type: Sequelize.INTEGER,
    defaultValue:0
  },
  poster_path:{
    type: Sequelize.STRING
  },
  title:{
    type:Sequelize.STRING
  },
  overview:{
    type:Sequelize.TEXT
  },
  homepage:{
    type:Sequelize.STRING
  },
  vote_average:{
    type:Sequelize.DECIMAL(10, 1)
  }
});

module.exports = Media;
