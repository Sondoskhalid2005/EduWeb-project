const express = require("express");
const router = express.Router();
const { askChatbot } = require("../controllers/chatbot.controller.js");

// POST /api/chat
router.post("/", askChatbot);

module.exports = router;