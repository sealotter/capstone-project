const Sequelize = require("sequelize");
const db = require("../db");

const Media = db.define("friends", {
  title: {
    type: Sequelize.STRING,
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
    type: Sequelize.INTEGER
  },
  numOfRatings: {
    type: Sequelize.INTEGER
  }
});

module.exports = Media;
