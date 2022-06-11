const Sequelize = require("sequelize");
const db = require("../db");

const Ratings = db.define("ratings", {
  rating: {
    type: Sequelize.INTEGER,
  },
  likes:{
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
});

module.exports = Ratings;
