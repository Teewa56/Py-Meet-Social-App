const router = require('express').Router();
const postCtrl = require('../Controllers/postController');
//posttext and post images will be different componenents

router.post("/:userId/postText", postCtrl.postText);
router.post("/:userId/postImage", postCtrl.postImage);
router.post("/:postId/likePost", postCtrl.likePost);
router.post("/:postId/unlikePost", postCtrl.unlikePost);
router.put("/:postId/editPost", postCtrl.editPost);
router.delete("/:postId/deletePost", postCtrl.deletePost);
router.get("/allPosts", postCtrl.getAllPosts);

module.exports = router;