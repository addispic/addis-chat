const mongoose = require('mongoose');

// profile schema
const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
})

// exports
module.exports = mongoose.models.Profile || mongoose.model('Profile',profileSchema)