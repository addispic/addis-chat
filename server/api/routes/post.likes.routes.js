const { Router } = require("express");

// middleware
//  auth
const { privateRoute } = require("../middlewares/auth.middleware");

// controllers
const {
  getAllPostLikes,
  addNewPostLike,
  deletePostLike
} = require('../controllers/post.likes.controllers');

// router
const router = Router();

// get all likes
router.get("/get-all-post-likes", getAllPostLikes);

// add new post like
router.post("/add-new-post-like/:postId",privateRoute, addNewPostLike);

// delete post like
router.delete("/delete-post-like/:_id", privateRoute, deletePostLike);

// exports
module.exports = router;
