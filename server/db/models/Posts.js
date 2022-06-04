const Sequelize = require("sequelize");
const db = require("../db");

const Posts = db.define("posts", {
  content: {
    type: Sequelize.TEXT,
  },
  username: {
    type: Sequelize.STRING,
  },
  avatarUrl: {
    type: Sequelize.STRING,
  }
});

module.exports = Posts;
