const router = require("express").Router(),
  { User } = require("../models/"),
  { check, validationResult } = require("express-validator"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken");

// post
// api/users
// register user
// public
router.post(
  "/register",

  async (req, res) => {

    try {
      const { screenName, email, password } = req.body;
      let user = await User.findOne({ where: { email } });


      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "A user with that email already exists" }] });
      }

      user = await User.create({ screenName, email, password });

      const salt = await bcrypt.genSalt(12);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.json({ msg: "Account Created!" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
);

module.exports = router;
