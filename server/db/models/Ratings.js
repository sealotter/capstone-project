const Sequelize = require("sequelize");
const db = require("../db");

const Ratings = db.define("ratings", {
  rating: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Ratings;
