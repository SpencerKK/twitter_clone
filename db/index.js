const Sequelize = require("sequelize");

module.exports = new Sequelize("twitter_clone", "root", "skk35!!!", {
  query: { raw: true },
  host: "localhost",
  dialect: "mysql"
});
