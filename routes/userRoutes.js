const router = require("express").Router();
const { User } = require("../models/");
const { Op } = require("sequelize");
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
  [
    check("email", "Please include a valid email to register").isEmail(),
    check("screenName", "You must include a screenName with at least 5 characters").isLength({ min: 5 }),
    check("password", "Please include a password with at least 6 characters").isLength({ min: 6 })
  ],
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
          screenName
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
router.post("/login", [
  check("email", "Please include your email or screenName to login").not().isEmpty(),
  check("password", "You must include your valid password to login").not().isEmpty()
], async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: req.body.email },
          { screenName: req.body.email }
        ]
      }
    });
    

    if (user) {
      id = user.id;
      screenName = user.screenName;
    } else {
      return res.status(400).json({ errors: [{ msg: "User with those credentials does not exist..." }] })
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch)  {
      return res.status(400).json({ errors: [{ msg: "We could not verify your credentials. Please try again" }] })
    }

      // jwt
      const payload = {
        user: {
          id,
          screenName
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
})

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
