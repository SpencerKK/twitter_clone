const router = require("express").Router();
const { User } = require("../models");
const { Post } = require("../models");
const { check, validationResult } = require("express-validator");
const authMid = require("../middleware/authMid");

// post
// api/users/post
// create post
// private
router.post("/post", [
   authMid,
   [check("content", "Cannot create an empty post").not().isEmpty()],
], async (req, res) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   try {

      let post = await Post.create({
         content: req.body.content,
         userId: req.user.id
      });

      res.json({ post });

   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
});

module.exports = router;