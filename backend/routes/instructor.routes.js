const express = require("express");
const router = express.Router();
const controller = require("../controllers/instructor.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js"); 
const userAuth=require("../middleware/userAuth.middleware.js")


router.post("/add-course", authMiddleware.authMiddleware,userAuth.instructorAuth ,  controller.addCourse);
router.post("/add-lesson", authMiddleware.authMiddleware,userAuth.instructorAuth , controller.addLesson);
router.post("/add-task" , authMiddleware.authMiddleware, userAuth.instructorAuth,controller.addTask);
router.post("/add-question/:taskId", authMiddleware.authMiddleware, userAuth.instructorAuth, controller.addQuestion);


module.exports = router;
