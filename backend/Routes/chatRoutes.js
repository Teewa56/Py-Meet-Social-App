const router = require('express').Router();
const chatController = require('../Controllers/chatController');

// Routes
router.post('/send', chatController.sendMessage);
router.get('/getMessages/:userId1/:userId2', chatController.getMessagesForChat);
router.get('/getLastMessages', chatController.getLastMessagesWithDetails);
router.put('/edit/:id', chatController.editMessage);
router.delete('/delete/:id', chatController.deleteMessage);

module.exports = router;
