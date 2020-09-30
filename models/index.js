const sequelize = require("../db");

const User = require("./User");
const Post = require("./Post");
const Followers = sequelize.define("followers");


User.hasMany(Post);

Post.belongsTo(User);

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
})


module.exports = { User, Post, Followers };