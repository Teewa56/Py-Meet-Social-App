const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: String,
    read: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model("Notification", notificationSchema);
  