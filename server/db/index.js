//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Comments = require("./models/Comments");
const Friends = require("./models/Friends");
const Media = require("./models/Media");
const Ratings = require("./models/Ratings");

//associations could go here!
User.hasMany(Comments);
User.hasMany(Ratings);
Media.hasMany(Ratings);
User.hasMany(Friends);
Ratings.hasMany(Comments);

module.exports = {
  db,
  models: {
    User,
    Comments,
    Friends,
    Media,
    Ratings,
  },
};
