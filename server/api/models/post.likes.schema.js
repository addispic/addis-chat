const mongoose = require("mongoose");

// post likes schema
const postLikeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    postId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// exports
module.exports =
  mongoose.models.PostLike || mongoose.model("PostLike", postLikeSchema);
