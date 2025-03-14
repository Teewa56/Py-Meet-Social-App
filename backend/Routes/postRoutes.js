const router = require('express').Router();
const postCtrl = require('../Controllers/postController');

router.post("/postText", postCtrl.postText);
router.post("/postImage", postCtrl.postImage);
router.post("/likePost/:postId", postCtrl.likePost);
router.post("/unlikePost/:postId", postCtrl.unlikePost);
router.put("/editPost/:postId", postCtrl.editPost);
router.delete("/deletePost/:postId", postCtrl.deletePost);
router.get('/getPost/:postId', postCtrl.getPostById);
router.get("/allPosts", postCtrl.getAllPosts);

module.exports = router;