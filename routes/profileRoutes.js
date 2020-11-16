const router = require("express").Router();
const authMid = require("../middleware/authMid");
const { User, Post, Comment, Followers, Likes } = require("../models");
const { sequelize } = require("../models/User");
const { Op } = require("sequelize");

// get
// api/profile
// get profile info
router.get("/getProfile/:userId", authMid, async (req, res) => {
   try {
      let userId = req.params.userId;
      let currentUserId = req.user.id;

      let user = await User.findOne({
         where: {
            id: userId,
         },
      });

      let userPosts = await Post.findAll({
         where: {
            userId,
         },
         order: [["id", "DESC"]],
      });

      let likeGroups = await Likes.findAll({
         raw: true,
         group: ["postId"],
         attributes: {
            include: [
               [sequelize.fn("COUNT", sequelize.col("postId")), "likeCount"],
            ],
            exclude: ["createdAt", "updatedAt", "userId"],
            // above me, I exclude those values giving me the error for not being functionally dependent on columns in my GroupBy clause
         },
      });

      let commentGroups = await Comment.findAll({
         raw: true,
         group: ["postId"],
         attributes: {
            include: [
               [sequelize.fn("COUNT", sequelize.col("postId")), "commentCount"],
            ],
            exclude: [
               "id",
               "content",
               "screenName",
               "createdAt",
               "updatedAt",
               "userId",
            ],
         },
      });

      userPosts = userPosts.map((post) => {
         let theLikes = likeGroups.find(({ postId }) => post.id === postId);
         let theComments = commentGroups.find(
            ({ postId }) => post.id === postId
         );
         return { ...post, ...theLikes, ...theComments };
      });

      // getting like status of person looking at the post
      userPostIds = userPosts.map((post) => {
         return post.id;
      });

      let likes = await Likes.findAll({
         where: {
            [Op.and]: [{ userId: currentUserId }, { postId: userPostIds }],
         },
      });

      let inter = userPosts.filter((item1) =>
         likes.some((item2) => item1.postId === item2.postId)
      );

      for (var i = 0; i < inter.length; i++) {
         inter[i] = Object.assign({ isLiked: true }, inter[i]);
      }

      // combining original posts with new posts that have isLiked
      userPosts = userPosts.map((n) => {
         let post = inter.find(({ postId }) => postId === n.postId);
         return post ? post : n;
      });

      // following/follower count
      let isFollowingCount = await Followers.findAll({
         raw: true,
         group: ["follower_id"],
         attributes: {
            include: [
               [
                  sequelize.fn("COUNT", sequelize.col("follower_id")),
                  "followingCount",
               ],
            ],
            exclude: ["createdAt", "updatedAt", "followed_id"],
         },
      });

      let followerCount = await Followers.findAll({
         raw: true,
         group: ["followed_id"],
         attributes: {
            include: [
               [
                  sequelize.fn("COUNT", sequelize.col("followed_id")),
                  "followerCount"
               ],
            ],
            exclude: ["createdAt", "updatedAt", "follower_id"]
         }
      })

      isFollowingCount = isFollowingCount.filter((n) => n.follower_id === parseInt(userId));
      followerCount = followerCount.filter(n => n.followed_id === parseInt(userId));

      if (isFollowingCount.length === 0) {
         let followCountPlace = { followingCount: 0 };
         isFollowingCount.push(followCountPlace);
      }

      if (followerCount.length === 0) {
         let followerCountPlace = { followerCount: 0 };
         followerCount.push(followerCountPlace);
      }

      res.json({ user, userPosts, isFollowingCount, followerCount });
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
});

module.exports = router;
