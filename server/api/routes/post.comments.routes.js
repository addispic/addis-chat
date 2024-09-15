const { Router } = require("express");

// middleware
// auth middleware
const {
    privateRoute
} = require('../middlewares/auth.middleware')

// router
const router = Router();

// get all post comments
router.get("/get-post-comments", (req, res) => {
  return res.status(200).json({
    message: "get all post comments",
  });
});

// add new comment
router.post("/add-new-post-comment",privateRoute, (req, res) => {
  return res.status(200).json({
    message: "add new post comment",
  });
});

// delete post comment
router.delete("/delete-post-comment/:_id", privateRoute, (req, res) => {
  return res.status(200).json({
    message: "delete post comment",
  });
});

// exports
module.exports = router;
