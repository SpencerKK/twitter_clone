const express = require("express"),
  db = require("./db"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  app = express();

app.use((morgan('combined')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use("/api/users", require("./routes/userRoutes"));

// database
db.sync({
  logging: console.log,
  // force: true,
})
  .then(() => app.listen(process.env.PORT || 5010))
  .then(() => console.log("successfully connected to mysql"))
  .catch((err) => console.error(err));
