const router = require("express").Router();
const { User } = require("../models/");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

      // jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: "360000" },
        (err, token) => {
          if (err) {
            console.error(err.message);
          } else {
            res.json({ token });
          }
        }
      );
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
);

module.exports = router;
