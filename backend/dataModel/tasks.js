const mongoose = require('mongoose');
const questionSchema=require("./questions.js")
const lessons=require("./lessons.model.js")
const taskSchema = new mongoose.Schema({
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lessons',   // link task to a lesson
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  }],  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Task", taskSchema);