const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const authMid = require("../middleware/authMid");

const { User } = require("../models");
const { Post } = require("../models");
const { Followers } = require("../models");
const { Likes } = require("../models");

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
            screenName: req.user.screenName,
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
      let userId = req.user.id;

      let isFollowing = await Followers.findAll({
         where: {
            follower_id: userId,
         },
      });

      let followedUserIds = isFollowing.map((n) => n.followed_id);

      let isFollowingPosts = await Post.findAll({
         where: {
            userId: followedUserIds,
         },
         order: [["id", "DESC"]],
      });

      // liked posts come into play here
      let allLikes = await Likes.findAll({
         where: {
            userId: req.user.id,
         },
      });

      let likedPostIds = allLikes.map((n) => n.postId);

      let likedPosts = await Post.findAll({
         raw: true,
         where: {
            id: likedPostIds,
         },
      });

      // Adding new liked status to all of the likedPosts
      for (var i = 0; i < likedPosts.length; i++) {
         likedPosts[i] = Object.assign({ isLiked: true }, likedPosts[i]);
      }

      // combining likedPosts & isFollowingPosts

      let combinedPosts = isFollowingPosts.map((n) => {
         let post = likedPosts.find(({ id }) => id === n.id);
         return post ? post : n;
      });

      res.json({ combinedPosts });
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
});

// get
// api/posts/getMyRecentPosts
// gets the post that you have recently made
// private
router.get("/getMyRecentPosts", authMid, async (req, res) => {
   try {
      let userId = req.user.id;

      let myRecentPosts = await Post.findAll({
         where: {
            userId,
         },
         order: [["id", "DESC"]],
         limit: 2,
      });

      res.json({ myRecentPosts });
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
});

module.exports = router;
