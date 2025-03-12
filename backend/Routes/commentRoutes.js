const commentCtrl = require("../Controllers/commentController");
const router = require('express').Router();

router.post('/:postId/makeComment', commentCtrl.makeComment);
router.post('/likeComment/:commentId', commentCtrl.likeComment)
router.post('/unlikeComment/:commentId', commentCtrl.unlikeComment);
router.delete('/deleteComment/:commentId', commentCtrl.deleteComment);
router.put('/editComment/:commentId', commentCtrl.editComment);

module.exports = router;