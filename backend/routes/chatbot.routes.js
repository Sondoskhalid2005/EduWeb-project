const express = require('express');
const router = express.Router();
const { askChatbot, getCourseInfo } = require('../controllers/chatbot.controller');

// Create rate limiter in routes file
const rateLimit = require('express-rate-limit');

const chatbotLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: "Too many questions, please try again later."
});

// Apply rate limiting to chatbot routes
router.use(chatbotLimiter);

// Main chatbot endpoint
router.post('/ask', askChatbot);


module.exports = router;