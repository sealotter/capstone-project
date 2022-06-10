//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Comments = require("./models/Comments");
const Relationship = require("./models/Relationship");
const Media = require("./models/Media");
const Ratings = require("./models/Ratings");
const Posts = require("./models/Posts")
const List = require('./models/List');


//associations could go here!
User.hasMany(Comments);
User.hasMany(Ratings);
Media.hasMany(Ratings ,{foreignKey: 'mediaId'});
User.hasMany(Relationship, {foreignKey:'senderId'});
Relationship.belongsTo(User, {as:'recipient'})
Ratings.hasMany(Comments);

Posts.belongsTo(User)

List.belongsTo(Media, {foreignKey: 'mediaId'})
// Media.belongsTo(WatchList)
// WatchList.hasMany(Media, {foreignKey: 'mediaId'})



module.exports = {
  db,
  models: {
    User,
    Comments,
    Relationship,
    Media,
    Ratings,
    Posts,
    List
  },
};
