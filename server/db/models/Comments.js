const Sequelize = require("sequelize");
const db = require("../db");

const Comments = db.define("comments", {
  comment: {
    type: Sequelize.STRING,
  },
});

module.exports = Comments;
