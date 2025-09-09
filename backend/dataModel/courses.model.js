const mongoose = require("mongoose");
const lessons=require("../dataModel/lessons.model")
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructorName:{
    type: String,
    required: true,
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructors", // references to the instructors collection
    required: true,
  },
  courseImage: {
    type: String,
  },
  lessons: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "lessons" 
      }],  
});


module.exports = mongoose.model("Courses", courseSchema);

