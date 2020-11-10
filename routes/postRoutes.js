const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const authMid = require("../middleware/authMid");
const { Op } = require("sequelize");


const { User, Post, Comment, Followers, Likes } = require("../models");
const { findAndCountAll, sequelize } = require("../models/User");

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

      // add total like count to each post
      let likeGroups = await Likes.findAll({
         raw: true,
         group: ["postId"],
         attributes: {
            include: [
               [sequelize.fn("COUNT", sequelize.col("postId")), "likeCount"],
            ],
            exclude: ["createdAt", "updatedAt", "userId"]
            // above me, I exclude those values giving me the error for not being functionally dependent on columns in my GroupBy clause
         }
      })

      // add total comments to each post
      let commentGroups = await Comment.findAll({
         group: ["postId"],
         attributes: {
            include: [
               [sequelize.fn("COUNT", sequelize.col("postId")), "commentCount"]
            ],
            exclude: ["id", "content", "screenName", "createdAt", "updatedAt", "userId"]
         }
      })

      let postArray = combinedPosts.map(post => {
         let theLikes = likeGroups.find(({ postId }) => post.id === postId);
         let theComments = commentGroups.find(({postId}) => post.id === postId);
         return { ...post, ...theLikes, ...theComments }
      })


      // res.json({ combinedPosts, likeGroups });
      res.json({ postArray })
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

      // likes come into play here
      let recentPostIds = myRecentPosts.map(post => {
         return post.id
      })
      
      let mySelfLikes = await Likes.findAll({
         where: {
            userId: req.user.id,
            postId: recentPostIds
         }
      })

      let mySelfLikeIds = mySelfLikes.map(like => {
         return like.postId
      })

      let mySelfLikedPosts = await Post.findAll({
         raw: true,
         where: {
            id: mySelfLikeIds
         }
      })

      // adding new liked status to all of the selfLikedPosts
      for (var i = 0; i < mySelfLikedPosts.length; i++) {
         mySelfLikedPosts[i] = Object.assign({ isLiked: true }, mySelfLikedPosts[i])
      }

      // combinging myRecentPosts and selfLikedPosts
      let combinedPosts = myRecentPosts.map(n => {
         let post = mySelfLikedPosts.find(({id}) => id === n.id);
         return post ? post : n;
      })

      // add total like count to each post
      let likeGroups = await Likes.findAll({
         raw: true,
         group: ["postId"],
         attributes: {
            include: [
               [sequelize.fn("COUNT", sequelize.col("postId")), "likeCount"],
            ],
            exclude: ["createdAt", "updatedAt", "userId"]
         }
      })

      let postArray = combinedPosts.map(post => {
         let theLikes = likeGroups.find(({ postId }) => post.id === postId);
         return { ...post, ...theLikes }
      })


      res.json({ postArray });
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
});

// get
// api/posts/singlePost
// pulls up a single post you click on
// private

router.get("/singlePost/:postId", authMid, async (req, res) => {
   try {

      let postId = req.params.postId;
      let userId = req.user.id

      let post = await Post.findOne({
         where: {
            id: postId
         }
      })

      let postLikes = await Likes.findAll({
         where: {
            postId
         }
      })

      let postComments = await Comment.findAll({
         where: {
            postId
         }
      })

      let myLike = await Likes.findOne({
         where: {
            postId,
            userId
         }
      })

      let isLiked = myLike === null ? false : true

      let postLikeCount = postLikes.length;
      let postCommentCount = postComments.length;

      res.json({ post, postLikeCount, postCommentCount, isLiked });
      
   } catch (err) {
      res.status(500).json({ msg: err.message })
   }
})

module.exports = router;
