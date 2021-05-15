// import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
// set up many to one relationships between models
User.hasMany(Post, {
  foreignKey: 'creator_id',
});

Post.belongsTo(User, {
  foreignKey: 'creator_id',
});

User.hasMany(Comment, {
  foreignKey: 'creator_id',
});

Comment.belongsTo(User, {
  foreignKey: 'creator_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});
// export models
module.exports = { User, Post, Comment };
