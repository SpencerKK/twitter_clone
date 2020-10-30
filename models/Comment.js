const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Comment extends Model {}
Comment.init({
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    screenName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, modelName: "comments" })

module.exports = Comment;