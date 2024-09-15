// models
// post
const Post = require("../models/post.schema");
// post like
const PostLike = require("../models/post.likes.schema");

// get all post likes
const getAllPostLikes = async (req, res) => {
  try {
    const postLikes = await PostLike.find()
      .sort({ createdAt: -1 })
      .select({ postId: 1, userId: 1, _id: 1 });
    return res.status(200).json({
      postLikes,
    });
  } catch (err) {
    return res.status(400).json({
      error: "get all post likes error",
    });
  }
};

// add new post likes
const addNewPostLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const isPostExist = await Post.findById(postId);

    // is post exist
    if (!isPostExist) {
      return res.status(400).json({
        error: "post not found",
      });
    }

    // is user already like
    const isUserAlreadyLike = await PostLike.find({ userId });

    if (isUserAlreadyLike?.length > 0) {
      return res.status(400).json({
        error: "user already like the post",
      });
    }

    const newPostLike = await PostLike.create({ userId, postId });

    return res.status(200).json({
      newPostLike,
    });
  } catch (err) {
    return res.status(200).json({
      error: "add new post like error",
    });
  }
};

// delete post like
const deletePostLike = async (req, res) => {
  try {
    const { _id } = req.params;
    const isPostLikeExist = await PostLike.findById(_id);
    if (!isPostLikeExist) {
      return res.status(400).json({
        error: "post like not found",
      });
    }

    // is authorized
    if (!isPostLikeExist?.userId?.equals(req.user._id)) {
      return res.status(400).json({
        error: "unauthorized to delete the like",
      });
    }
    await PostLike.findByIdAndDelete(_id);
    return res.status(200).json({
      _id,
      message: "post like deleted",
    });
  } catch (err) {
    conso;
    return res.status(400).json({
      error: "delete post like error",
    });
  }
};

// exports
module.exports = {
  getAllPostLikes,
  addNewPostLike,
  deletePostLike,
};
