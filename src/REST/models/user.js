const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
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
        enum: ["User", "Author"]
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
    likes: [{ type: ObjectId, ref: "blogs" }],
    follows: [{ type: ObjectId, ref: "user" }]

}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);