const Notification = require("../Models/NotificationModel");

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all notifications for a user
exports.getNotificationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ user: userId }).sort({ timestamp: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNotification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    if (!updatedNotification) return res.status(404).json({ message: "Notification not found" });
    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNotification = await Notification.findByIdAndDelete(id);
    if (!deletedNotification) return res.status(404).json({ message: "Notification not found" });
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get unread notifications for a user
exports.getUnreadNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const unreadNotifications = await Notification.find({ user: userId, read: false }).sort({ timestamp: -1 });
    res.status(200).json(unreadNotifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
