const Sequelize = require("sequelize");
const db = require("../db");

const Posts = db.define("posts", {
  content: {
    type: Sequelize.TEXT,
  },
  likes:{
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue:[]
  },
  rating:{
    type:Sequelize.INTEGER
  }
});

module.exports = Posts;
