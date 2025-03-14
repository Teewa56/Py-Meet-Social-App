const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, maxLength: 200, required: true },
    timeStamp: { type: Date, default: Date.now },
    edited: { type: Boolean, default: false }
});

module.exports = mongoose.model('Chat', chatSchema);