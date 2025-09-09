const Course = require("../dataModel/courses.model")
const Lesson = require("../dataModel/lessons.model");
const Student = require("../dataModel/students.model")
const Instructor = require("../dataModel/instructors.model");
const enrollements=require("../dataModel/enrollements.model");
const Tasks=require("../dataModel/tasks")
const Submissions=require("../dataModel/submissions")
const mongoose = require("mongoose");
const { login } = require("./auth.controller");
const tasks = require("../dataModel/tasks");
const students = require("../dataModel/students.model");

const getcourses = async (req, res) => {
  try{
    const allcourses=await Course.find()
  return res.status(200).json({msg:"here is all courses",courses:allcourses})}
  catch(error){
      return res.status(500).json(error.message)
  }   
};
const getcoursebyid = async (req, res) => {
  try{
    const courseid= new mongoose.Types.ObjectId(req.params.courseid)
    const foundcourses=await Course.findById(courseid)
  return res.status(200).json({msg:"successfull",data:foundcourses})}
  catch(error){
      return res.status(500).json(error.message)
  }  
};
const mycourses=async (req, res) => {
   const allcourses=await Course.find({instructorId: req.user.id})
  try{
  return res.status(200).json({msg:"here is all your created courses",data:allcourses})}
  catch(error){
      return res.status(500).json(error.message)
  }  
};
const getCourseLessons = async (req, res) => {
  try {
    const courseId = new mongoose.Types.ObjectId(req.params.courseId);
    const lessons = await Lesson.find({ courseId }).sort({ position: 1 });
    return res.status(200).json({ data:lessons });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getLessonById = async (req, res) => {
  try {
    const lessonId = new mongoose.Types.ObjectId(req.params.lessonId);
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ msg: "Lesson not found" });
    return res.status(200).json({ lesson });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getLessonTasks = async (req, res) => {
  try {
    const lessonId = new mongoose.Types.ObjectId(req.params.lessonId);
    const tasks = await Tasks.find({ lessonId }).populate("questions");
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = new mongoose.Types.ObjectId(req.params.id);
    const task = await Tasks.findById(taskId).populate("questions");
    if (!task) return res.status(404).json({ msg: "Task not found" });
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const trackCourseProgress=async(req,res)=>{
  const courseId=new mongoose.Types.ObjectId(req.params.courseId)
  const studentId=req.user.id
  try{
  const lessonsids=await Course.findById(courseId).lessons.find()
  const lessonsWithTask=await Tasks.find({lessonId:lessonsids})
  const student= await students.findById(studentId)
  const studentsSubmittions = await student.populate("taskSubmissions").find({lessonId:lessonsids})
  const numberOfTasks=lessonsWithTask.length   
   return res.status(404).json({msg:"task not found "})
   }
   catch(error){
   return res.status(500).json({msg:error.message})
   }
}

// const getTaskquestions=async(req,res)=>{
//    let {lessonId}=req.body 
//    lessonId=new mongoose.Types.ObjectId(lessonId)
   
// try{ 
// const task= await Tasks.findOne({lessonId})
// const task1=await task.populate("questions");

// if(task){
// const questions=task1.questions.map((q)=>({
//    text:q.text, 
//    option1:q.options[0],
//    option2:q.options[1],
//    option3:q.options[2],
//    option4:q.options[3]
// }))
// return res.status(200).json({
//    taskId:task._id,
//    "task title":task.title,
//    "task discription":task.description,
//    data:questions
// })
// }
//  return res.status(404).json({msg:"task not found "}) 

// }catch(error){
// return res.status(500).json({msg:error.message})
// }

// }

const getTaskquestions = async (req, res) => {
  try {
    // get lessonId from params instead of body
    let { lessonId } = req.params;

    const task = await Tasks.findOne({ lessonId: new mongoose.Types.ObjectId(lessonId) })
      .populate("questions");

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    const questions = task.questions.map((q) => ({
      text: q.text,
      options: [q.options[0], q.options[1],q.options[2],q.options[3]]
    }));

    return res.status(200).json({ 
      taskId: task._id,
      taskTitle: task.title,
      taskDescription: task.description,
      data: questions,});
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;   // taken from authMiddleware (JWT)
    const role = req.user.role;   // assume you store role: "student" or "instructor"
    
    let profile;

    if (role === "student") {
      profile = await Student.findById(userId)
        .populate({
          path: "taskSubmissions",
          populate: {
            path: "taskId",
            select: "title description"  // show task details
          }
        })
        .select("-password"); // hide password
    } else if (role === "instructor") {
      profile = await Instructor.findById(userId).select("-password");
    } else {
      return res.status(400).json({ msg: "Invalid user role" });
    }
    console.log(profile);
    
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


module.exports = {
  getCourseLessons,
  getLessonById,
  getLessonTasks,
  getTaskById,
  getTaskquestions,
  trackCourseProgress,getcourses,getcoursebyid,mycourses,getProfile
};