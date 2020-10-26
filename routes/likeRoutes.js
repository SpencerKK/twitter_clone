const router = require("express").Router();
const { User, Post, Likes } = require("../models");
const authMid = require("../middleware/authMid");

// like
// /api/likes/like/:id
// like a post
// private
router.post("/like/:id", authMid, async (req, res) => {
   try {
      let userId = req.user.id;
      let postId = req.params.id;

    //   let likeInstance = await Likes.create({ userId, postId });
    //   res.json({ likeInstance });

    let existingLike = await Likes.findOne({
        where: {
            userId, postId
        }
    })

    if (existingLike) {
        await existingLike.destroy();
    } else {
        await Likes.create({userId, postId})
    }

    res.json({ msg: "Success" })
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
});

module.exports = router;