const express = require("express"),
  db = require("./db"),
  dotenv = require("dotenv");
  cors = require("cors");
  bodyParser = require("body-parser"),
  app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config({ path: "./.env" });

// routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/follows", require("./routes/followerRoutes"));

// database
db.sync({
  logging: console.log,
  // force: true,
})
  .then(() => app.listen(process.env.PORT || 5000))
  .then(() => console.log("successfully connected to mysql"))
  .catch((err) => console.error(err));
