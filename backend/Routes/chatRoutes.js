// chatRoutes.js
const router = require('express').Router();
const chatController = require('../Controllers/chatController');

router.post('/send', chatController.sendMessage);
router.get('/getMessages/:userId1/:userId2', chatController.getMessagesForChat);
router.get('/getLastMessages', chatController.getLastMessagesWithDetails);
router.delete('/deleteMessage/:messageId', chatController.deleteMessage);

module.exports = router;
