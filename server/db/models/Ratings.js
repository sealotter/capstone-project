const Sequelize = require("sequelize");
const db = require("../db");

const Ratings = db.define("ratings", {
  rating: {
    type: Sequelize.INTEGER,
  },
  review: {
    type:Sequelize.TEXT
  },
  likes:{
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
});

module.exports = Ratings;
