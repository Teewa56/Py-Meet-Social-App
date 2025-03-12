const express = require('express');
const router = express.Router();
const notificationController = require('../Controllers/NotificationController');

// Routes
router.post('/create', notificationController.createNotification);
router.get('/get/:userId', notificationController.getNotificationsByUser);
router.put('/markAsRead/:id', notificationController.markAsRead);
router.delete('/delete/:id', notificationController.deleteNotification);
router.get('/getUnread/:userId', notificationController.getUnreadNotifications);

module.exports = router;
