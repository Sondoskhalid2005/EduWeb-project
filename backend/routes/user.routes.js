const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Get current logged-in profile
router.get(
  "/profile",
  authMiddleware.authMiddleware,
  controller.getCurrentProfile
);

// Get user (student or instructor) by ID
router.get(
  "/:id",
  authMiddleware.authMiddleware,
  controller.getUserById
);

module.exports = router;
