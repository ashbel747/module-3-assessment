const express = require('express');
const router = express.Router();
const { currentUser, loginUser, registerUser, resetPassword } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', registerUser);
router.post('/login', loginUser); 
router.post('/reset-password', resetPassword);
router.get('/user', authMiddleware, currentUser);


module.exports = router;
