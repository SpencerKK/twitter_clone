const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const authMid = require("../middleware/authMid");

const { User } = require("../models");
const { Post } = require("../models");
const { Followers } = require("../models");

// post
// api/posts/post
// create post
// private
router.post(
   "/post",
   [authMid, [check("content", "Cannot create an empty post").not().isEmpty()]],
   async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      try {
         let post = await Post.create({
            content: req.body.content,
            userId: req.user.id,
            screenName: req.user.screenName
         });

         res.json({ post });
      } catch (err) {
         res.status(500).json({ msg: err.message });
      }
   }
);

// get
// api/posts/getFollowingPosts
// gets the post of users you are following
// private
router.get("/getFollowingPosts", authMid, async (req, res) => {
   try {
      // let user = await User.findOne({ where: { email } });
      let userId = req.user.id;

      let isFollowing = await Followers.findAll({
         where: {
            follower_id: userId,
         },
      });

      let followedUserIds = isFollowing.map(n => n.followed_user_id);

      let isFollowingPosts = await Post.findAll({
         where: {
            userId: followedUserIds,
         },
      });

      res.json({ isFollowingPosts });

   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
});

module.exports = router;
