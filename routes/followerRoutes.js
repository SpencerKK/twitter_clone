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
      let myUserId = req.user.id;

      // Find the userId and total posts of users who have posted
      let usersWhoHavePosted = await Post.findAll({
         attributes: ["userId", [sequelize.fn("COUNT", sequelize.col("userId")), "total"]],
         group: ["userId"]
      })

      // just returns the ids
      let theirIds = usersWhoHavePosted.map(user => {
         return user.userId
      })

      // Instances where logged in user is the follower
      let alreadyFollowing = await Followers.findAll({
         where: {
            follower_id: myUserId,
            followed_id: {
               [Op.in]: theirIds
            }
         }
      });

      // returns ids of those people user is following
      let alreadyFollowedIds = alreadyFollowing.map(user => {
         return user.followed_id
      })

      // those users who have made posts and who is not being followed by the logged in user
      let potentialFollowIds = theirIds.filter(n => !alreadyFollowedIds.includes(n));

      // profiles of those potential follows
      let potentialFollowUsers = await User.findAll({
         where: {
            id: {
               [Op.in]: potentialFollowIds
            }
         }
      })

      res.json({ potentialFollowUsers });

   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
});

module.exports = router;