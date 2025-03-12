const express = require('express');
const router = express.Router();
const groupController = require('../Controllers/groupController');


router.post('/create', groupController.createGroup);
router.put('/edit/:id', groupController.editGroup);
router.put('/updateMembers/:id', groupController.updateGroupMembers);
router.post('/sendMessage/:groupId', groupController.sendGroupMessage);
router.delete('/deleteGroup/:groupId', groupController.deleteGroup);

module.exports = router;
