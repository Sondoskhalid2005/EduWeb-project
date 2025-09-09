const express = require("express");
const router = express.Router();
const controller= require("../controllers/students.controller");
const authMiddleware = require("../middleware/auth.middleware"); 
const userAuth=require("../middleware/userAuth.middleware")

router.post("/get-grade/:taskId",authMiddleware.authMiddleware,controller.getStudentGrade);
router.get("/my-enrollments", authMiddleware.authMiddleware, controller.getStudentEnrollments);
router.post("/inroll-student/:courseid", authMiddleware.authMiddleware, controller.enrollstudent);

module.exports = router;