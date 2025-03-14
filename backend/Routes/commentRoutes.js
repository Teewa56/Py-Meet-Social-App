const commentCtrl = require("../Controllers/commentController");
const router = require('express').Router();

router.post('/:postId/makeComment', commentCtrl.makeComment);
router.post('/:commentId/likeComment', commentCtrl.likeComment)
router.post('/:commentId/unlikeComment', commentCtrl.unlikeComment);
router.delete('/:commentId/deleteComment', commentCtrl.deleteComment);
router.put('/:commentId/editComment', commentCtrl.editComment);
router.get('/:commentId/getComment', commentCtrl.getCommentById);

module.exports = router;