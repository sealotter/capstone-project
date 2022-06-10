const Sequelize = require("sequelize");
const db = require("../db");

const List = db.define('list', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
  
})

module.exports = List

