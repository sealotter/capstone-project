const Sequelize = require("sequelize");
const db = require("../db");

const Comments = db.define("comments", {
  comment: {
    type: Sequelize.STRING,
  },
  likes:{
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
});

module.exports = Comments;
