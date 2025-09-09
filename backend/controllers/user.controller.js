const Course = require("../dataModel/courses.model")
const Lesson = require("../dataModel/lessons.model");
const enrollements=require("../dataModel/enrollements.model");
const Tasks=require("../dataModel/tasks")
const Submissions=require("../dataModel/submissions")
const mongoose = require("mongoose");
const { login } = require("./auth.controller");
const tasks = require("../dataModel/tasks");
const students = require("../dataModel/students.model");

const getCurrentProfile = async (req, res) => {
  try {
    return res.status(200).json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id);
    const student = await students.findById(userId);
    if (student) return res.status(200).json({ role: "student", data: student });

    const instructor = await Course.findOne({ instructorId: userId });
    if (instructor) return res.status(200).json({ role: "instructor", data: instructor });

    return res.status(404).json({ msg: "User not found" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};



module.exports = {
  getCurrentProfile,
  getUserById
};