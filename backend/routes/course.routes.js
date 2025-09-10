const express = require("express");
const router = express.Router();
const controller = require("../controllers/courses.controller");
const authMiddleware = require("../middleware/auth.middleware");
const userAuth = require("../middleware/userAuth.middleware");

// // Get student inrolled courses that
// router.get("/my-inrolled-courses",authMiddleware.authMiddleware,controller.studentsInrolledCourses);

// Get my courses (instructor) of a course
router.get("/my-courses", authMiddleware.authMiddleware,userAuth.instructorAuth, controller.mycourses);

// Get all courses 
router.get("/get-courses",  controller.getcourses);

// Get task questions by lessonId
router.post("/task-questions/:lessonId", controller.getTaskquestions);

// Get all lessons of a course
router.get("/:courseId", authMiddleware.authMiddleware, controller.getCourseLessons);

// Get single lesson by ID
router.get("/lessons/:lessonId", authMiddleware.authMiddleware, controller.getLessonById);

// Get tasks of a lesson
router.get("/lessons/tasks/:lessonId", authMiddleware.authMiddleware, controller.getLessonTasks);

// Get single task by ID
router.get("/task/:id", authMiddleware.authMiddleware, controller.getTaskById);

// Track progress for a course
router.get("/:courseId/progress", authMiddleware.authMiddleware, userAuth.studentAuth, controller.trackCourseProgress);

module.exports = router;
