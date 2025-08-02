const express = require('express');
const router = express.Router();
const { getPosts } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getPosts);

module.exports = router;
