const router = require("express").Router();
const { User, Post, Likes } = require("../models");
const authMid = require("../middleware/authMid");

// post
// /api/likes/like/:id
// like a post
// private
router.post("/like/:id", authMid, async (req, res) => {
  try {
    let userId = req.user.id;
    let postId = req.params.id;

    let existingLike = await Likes.findOne({
      where: {
        userId,
        postId,
      },
    });

    if (existingLike) {
      await Likes.destroy({
        where: {
          userId,
          postId,
        },
      });
    } else {
      await Likes.create({ userId, postId });
    }

    res.json({ msg: "Success" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// get
// /api/likes/likedPosts
// retrieve a list of all post logged in user has liked
// private
router.get("/likedPosts", authMid, async (req, res) => {
  try {
    let userId = req.user.id;

    let allMyLikes = await Likes.findAll({
      where: {
        userId,
      },
    });

    let likedPostIds = allMyLikes.map((n) => n.postId);

    // like count on all posts
    let likeCounts = await Likes.findAll({
      raw: true,
      group: ["postId"],
      where: {
        id: likedPostIds
      }
    })

    // all posts I have liked
    let likedPosts = await Post.findAll({
        where: {
            id: likedPostIds
        }
    })

    res.json({ likedPosts });
    
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
