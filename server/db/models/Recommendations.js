const Sequelize = require('sequelize');
const db = require('../db');

const Recommendations = db.define('recommendations', {
  message: {
    type: Sequelize.TEXT,
  },
});

module.exports = Recommendations;
