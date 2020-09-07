const router = require("express").Router();
const { User } = require("../models/");
const { check, validationResult } = require("express-validator");
const authMid = require("../middleware/authMid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// post
// api/users/register
// register user
// public
router.post(
  "/register",

  async (req, res) => {
    try {
      const { screenName, email, password } = req.body;
      let user = await User.findOne({ where: { email } });
      let userScreenName = await User.findOne({ where: { screenName } })

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'An account is already associated with the email' }] });
      }

      if (userScreenName) {
        return res.status(400).json({ errors: [{ msg: "That screen name is already taken. Please select another." }] })
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

// post
// api/users/login
// login user
// public
// router.post("/login", [
//   check("email")
// ] async (req, res) => {

//   const { screenName, email, password } = req.body;

//   let user;
//   user = await User.findOne({ where: { screenName } })

//   if (!user) {
//     user = await User.findOne({ where: { email } });
//   }

//   res.json(user);

// })

// get
// api/users
// send token in header & get user info
// public
router.get("/", authMid, async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    res.json(user);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error")
  }
})

module.exports = router;
