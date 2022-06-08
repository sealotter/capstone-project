const Sequelize = require("sequelize");
const db = require("../db");

const WatchList = db.define('watchlist', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
  
})

module.exports = WatchList

