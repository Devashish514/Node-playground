const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const LikeNodeSchema = new mongoose.Schema({
    element: { type: String, required: true },
    next: { type: ObjectId, ref: 'LikeNode' }
}, { timestamps: true });

module.exports = mongoose.model('LikeNode', LikeNodeSchema);