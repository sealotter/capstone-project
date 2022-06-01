const Sequelize = require("sequelize");
const db = require("../db");

const Relationship = db.define("relationship", {
  status:{
    type:Sequelize.ENUM(['accepted', 'pending']),
    defaultValue: "pending"
  }
});

module.exports = Relationship;
