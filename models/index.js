const sequelize = require("../db");

const User = require("./User");
const Post = require("./Post");
const Followers = sequelize.define("followers");
const Likes = sequelize.define("Likes");

// Post associations
User.hasMany(Post);
Post.belongsTo(User);

// likes
Post.belongsToMany(User, { through: "Likes" });
User.belongsToMany(Post, { through: "Likes" });

// Follows
// user's followers
User.belongsToMany(User, {
    as: "followed_user",
    through: Followers,
    foreignKey: "followed_id",
    otherKey: "follower_id"
});
// users a user follows
User.belongsToMany(User, {
    as: "follower",
    through: Followers,
    foreignKey: "follower_id",
    otherKey: "followed_id"
});

module.exports = { User, Post, Followers, Likes };