const { BOOLEAN } = require('sequelize');
const Sequelize = require("sequelize");
const db = require("../db");

const Watchlist = db.define('list', {
  hasWatched: {
    type: BOOLEAN,
    defaultValue: false,
  }
  
})

module.exports = Watchlist

