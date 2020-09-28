const router = require("express").Router();
const { Followers } = require("../models");
const authMid = require("../middleware/authMid");

// post
// /api/follows/follow/:id
// follow a user
// private
router.post("/follow/:id", authMid, async (req, res) => {
    try {

        let follower_id = req.user.id;
        let followed_user_id = req.params.id;

        let followInstance = await Followers.create({ follower_id, followed_user_id});
            
        res.json({ followInstance });

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
})

module.exports = router;