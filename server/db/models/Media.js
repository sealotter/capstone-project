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
  }
});

module.exports = Media;
