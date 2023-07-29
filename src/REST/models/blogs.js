const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    metaTags: {
        type: Object,
        default: []
    },
    author: {
        type: ObjectId,
        required: true,
        ref: 'author'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    likesCount: {
        type: Number
    }

}, { timestamps: true });


module.exports = mongoose.model('blogs', blogSchema);