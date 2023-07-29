const { object } = require('joi');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const authorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        enum: ["User", "Author"],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    follows: [{ type: ObjectId, ref: "author" }],
    blogs: [{ type: ObjectId, ref: "blogs" }]

}, { timestamps: true });

module.exports = mongoose.model('author', authorSchema);