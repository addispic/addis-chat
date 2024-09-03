const mongoose = require('mongoose');

// schema
// post schema
const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
    },
    files: {
        type: Array,
    }

},{timestamps: true});

// exports
module.exports = mongoose.models.Post || mongoose.model('Post',postSchema);