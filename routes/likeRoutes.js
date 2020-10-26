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

    let existingLike = await Likes.findOne({
        where: {
            userId, postId
        }
    })

    if (existingLike) {
        await Likes.destroy({
            where: {
                userId, postId
            }
        })
    } else {
        await Likes.create({userId, postId})
    }

    res.json({ msg: "Success" })
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
});

module.exports = router;