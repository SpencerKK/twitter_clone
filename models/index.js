const User = require("./User");
const Post = require("./Post");

User.hasMany(Post);

Post.belongsTo(User);

// user's followers
User.belongsToMany(User, {
    as: "followed_user",
    through: "followers",
    foreignKey: "followed_user_id",
    otherKey: "follower_id"
});

// users a user follows
User.belongsTo(User, {
    as: "follower",
    through: "followers",
    foreignKey: "follower_id",
    otherKey: "followed_user_id"
})


module.exports = { User, Post };