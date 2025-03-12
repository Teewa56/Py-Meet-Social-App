const router =  require("express").Router();
const userctrl = require("../Controllers/userController");


router.get(`/search`, userctrl.searchUser);
router.post('/follow/:followId', userctrl.followUser);
router.post('/unfollow/:unfollowId', userctrl.unfollowUser);
router.get('/:userId/following', userctrl.getFollowing);
router.get('/:userId/followers', userctrl.getFollowers);
router.get('/:userId/profile', userctrl.getUserProfile);
router.get("/:userId/likedPosts", userctrl.getLikedPosts);
router.get("/:userId/Posts", userctrl.getPosts);

module.exports = router; 