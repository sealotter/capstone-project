const Sequelize = require("sequelize");
const db = require("../db");

const Friends = db.define("friends", {
  username: {
    type: Sequelize.STRING,
  },
});

module.exports = Friends;
