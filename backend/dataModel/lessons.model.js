const mongoose = require("mongoose");
const lessonSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  position: {
    type: Number, // order inside course
    default: 0,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
});
// prevent duplicate lesson
lessonSchema.index({ courseId: 1, title: 1 }, { unique: true });
module.exports = mongoose.model("lessons", lessonSchema);

