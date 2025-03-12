const router = require('express').Router();
const authController = require('../Controllers/authController');
const authMiddleware = require('../Middleware/authMiddleware');

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.delete('/delete_account', authMiddleware, authController.deleteAccount);
router.post('/setup_profile',authMiddleware, authController.setUpProfile);
router.put('/edit_profile', authMiddleware, authController.editProfile);
router.post('/refresh_token', authController.generateToken);

module.exports = router;