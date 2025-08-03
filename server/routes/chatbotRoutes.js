const express = require('express');
const router = express.Router();
const { sendMessage, getSuggestions, getChatHistory } = require('../controllers/chatbotController');

// @route   POST /api/chatbot/chat
// @desc    Send message to chatbot and get AI response
// @access  Public
router.post('/chat', sendMessage);

// @route   GET /api/chatbot/suggestions
// @desc    Get suggested chat prompts
// @access  Public
router.get('/suggestions', getSuggestions);

// @route   GET /api/chatbot/history/:userId
// @desc    Get chat history for a user
// @access  Private (you can add auth middleware later)
router.get('/history/:userId', getChatHistory);

module.exports = router;s