//this is the access point for all things database related!

const db = require("./db");
const User = require("./models/User");
const Comments = require("./models/Comments");
const Relationship = require("./models/Relationship");
const Media = require("./models/Media");
const Ratings = require("./models/Ratings");
const Posts = require("./models/Posts")
const Watchlist = require('./models/Watchlist');
const Recommendations = require('./models/Recommendations');
const Chat = require('./models/Chat')


//associations could go here!
User.hasMany(Comments);
Comments.belongsTo(User)
Comments.belongsTo(Posts)
User.hasMany(Ratings);
Media.hasMany(Ratings ,{foreignKey: 'mediaId'});
User.hasMany(Relationship, {foreignKey:'senderId'});
Relationship.belongsTo(User, {as:'recipient'})
Ratings.hasMany(Comments);
Posts.belongsTo(User)
User.hasMany(Posts)
Comments.belongsTo(Ratings)
Ratings.hasMany(Comments)
Recommendations.belongsTo(User, { as: 'user' });
Recommendations.belongsTo(User, { as: 'friend' });
Recommendations.belongsTo(Media, { as: 'media' });
Chat.belongsTo(User, {as:'user1'})
Chat.belongsTo(User, {as:'user2'})
Watchlist.belongsTo(Media, {foreignKey: 'mediaId'})
Watchlist.belongsTo(User)

Posts.hasMany(Posts)


module.exports = {
  db,
  models: {
    User,
    Comments,
    Relationship,
    Media,
    Ratings,
    Posts,
    Watchlist,
    Recommendations,
    Chat
  },
};