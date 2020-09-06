const Sequelize = require("sequelize");

module.exports = new Sequelize("twitter_clone", "root", "skk35!!!", {
  host: "localhost",
  dialect: "mysql"
});
