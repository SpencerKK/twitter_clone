const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const authMid = require("../middleware/authMid");

const { Comment } = require("../models");

router.post(
   "/comment/:postId",
   [
      authMid,
      [check("content", "Cannot create and empty post").not().isEmpty()],
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      let postId = req.params.postId;
      let commentBody = req.body.content;
      try {
         let comment = await Comment.create({
            content: commentBody,
            postId: postId,
            userId: req.user.id,
            screenName: req.user.screenName,
         });

         res.json({ comment });
      } catch (err) {
         res.status(500).json({ msg: err.message });
      }
   }
);

module.exports = router;
