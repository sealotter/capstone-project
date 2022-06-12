const Sequelize = require("sequelize");
const db = require("../db");

const Chat = db.define("chat", {
  messages:{
    type: Sequelize.TEXT
  }  
});

module.exports = Chat;