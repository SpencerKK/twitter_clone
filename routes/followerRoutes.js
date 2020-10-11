const router = require("express").Router();
const { Followers, Post, User } = require("../models");
const authMid = require("../middleware/authMid");
const { sequelize } = require("../models/User");
const { Op } = require("sequelize");
const { Result } = require("express-validator");

// post
// /api/follows/follow/:id
// follow a user
// private
router.post("/follow/:id", authMid, async (req, res) => {
   try {
      let follower_id = req.user.id;
      let followed_id = req.params.id;

      let followInstance = await Followers.create({ follower_id, followed_id });

      res.json({ followInstance });
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
});

// get
// /api/follows/getActiveUserList
// retrieves a list of users who have made posts
// private
router.get("/getActiveUsersList", authMid, async (req, res) => {
   try {

      let usersWhoHavePosted = await Post.findAll({
         attributes: ["screenName", [sequelize.fn("COUNT", sequelize.col("screenName")), "total"]],
         group: ["screenName"]
      })

      let myArray = await usersWhoHavePosted.map(theArray => {
         return theArray.screenName
      })

      let users = await User.findAll({
         where: {
            screenName: {
               [Op.in]: myArray
            }
         }
      })

      res.json({ users });

      // res.json({ users });
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
});

module.exports = router;