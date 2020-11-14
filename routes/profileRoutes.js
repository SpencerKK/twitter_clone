const router = require("express").Router();
const authMid = require("../middleware/authMid");
const { User, Post, Comment, Followers, Likes } = require("../models");
const { sequelize } = require("../models/index");

// get
// api/profile
// get profile info
router.get("/getProfile/:userId", authMid, async (req, res) => {
   try {
      let userId = req.params.userId;

      let user = await User.findOne({
         where: {
            id: userId,
         },
      });

      let userPosts = await Post.findAll({
         where: {
            userId
         },
         order: [["id", "DESC"]]
      })

      res.json({ user, userPosts });
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
});

module.exports = router;
