const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Post extends Model {}
Post.init({
    content: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 
    screenName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, modelName: "posts" })

module.exports = Post;