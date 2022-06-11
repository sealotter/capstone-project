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

// Comments.findOne({
//   where:{
//     userId:user.id,
//     postId:post.id
//   }
// }
// ).likes

//comment.likes = [doug, angel, anna]

module.exports = Comments;
