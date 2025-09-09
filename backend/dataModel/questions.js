const mongoose = require("mongoose");
const Task=require("./tasks")
const questionSchema = new mongoose.Schema({
  taskId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Task" 
  },
  text: {
    type: String,
    required: true
  },
  options: [
    {
      type: String,
      required: true
    }
  ],
  correctAnswer: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Question", questionSchema);
