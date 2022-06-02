const Sequelize = require("sequelize");
const db = require("../db");

const Posts = db.define("posts", {
  content: {
    type: Sequelize.TEXT,
  },
});

module.exports = Posts;
