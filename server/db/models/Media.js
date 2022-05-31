const Sequelize = require("sequelize");
const db = require("../db");

const Media = db.define("friends", {
  title: {
    type: Sequelize.STRING,
  },
  //movie/ show/ documentary/ etc..
  media: {
    type: Sequelize.STRING,
  },
  //where to watch
  service: {
    type: Sequelize.STRING,
  },
});

module.exports = Media;
