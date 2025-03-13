const router =  require("express").Router();
const userctrl = require("../Controllers/userController");


router.get(`/search`, userctrl.searchUser);
router.post('/follow/:followId', userctrl.followUser);
router.post('/unfollow/:unfollowId', userctrl.unfollowUser);
router.get('/following/:userId', userctrl.getFollowing);
router.get('/followers/:userId', userctrl.getFollowers);
router.get('/profile/:userId', userctrl.getUserProfile);

module.exports = router; 