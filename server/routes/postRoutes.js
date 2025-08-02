const express = require('express');
const router = express.Router();
const { createPost, updatePost, deletePost, getPosts } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.get('/', getPosts);

module.exports = router;
