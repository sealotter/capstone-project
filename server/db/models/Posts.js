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
  },
  likes:{
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
});

module.exports = Posts;
