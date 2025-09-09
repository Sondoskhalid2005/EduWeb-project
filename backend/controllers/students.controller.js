const Course = require("../dataModel/courses.model")
const Lesson = require("../dataModel/lessons.model");
const enrollements=require("../dataModel/enrollements.model");
const Tasks=require("../dataModel/tasks")
const Submissions=require("../dataModel/submissions")
const mongoose = require("mongoose");
const students = require("../dataModel/students.model");


const enrollstudent=async(req,res)=>{
const studentId=req.user.id
let courseid=req.params.courseid
courseid= new mongoose.Types.ObjectId(courseid)
console.log(courseid,studentId);

try{
const course = await Course.findById(courseid);
if (!course) {
return res.status(404).json({msg: "Course not found"});
}
const enrolleduser=await enrollements.findOne({courseId:courseid, studentId:studentId})

if(!enrolleduser){
const newenrollment = new enrollements({courseId:courseid, studentId:studentId})
await newenrollment.save()
return res.status(201).json({msg:"user enrolled in course successfully"})
}
return res.status(400).json({msg:"you have already enrolled in the course"})
}
catch(error){
return res.status(500).json(error.message)}

}

const getStudentGrade=async(req,res)=>{
   let taskId=req.params.taskId // or take lesson id
   const studentAnswers=req.body.studentAnswers
   taskId= new mongoose.Types.ObjectId(taskId)
   const studentId=req.user.id
   console.log(studentAnswers);
   
   try{
   const task= await Tasks.findById(taskId).populate("questions") // get task questions info directly (rather than getting  ids)
   if(task){

  let score = 0;
  task.questions.forEach((question, i) => {
  if (String(question.correctAnswer).toLocaleLowerCase().trim() === String(studentAnswers[i]).toLocaleLowerCase().trim()) score++;
console.log({
  correct: question.correctAnswer,
  student: studentAnswers[i],
  options: question.options
});});
console.log(task.questions);

  const newSubmittion = new Submissions({
   taskId,
   studentId,
   grade:score
}) 

   await newSubmittion.save()
   return res.status(200).json({msg:"tasked solved successfully ",
      grade:newSubmittion.grade})
  }
   return res.status(404).json({msg:"task not found "})
   }catch(error){
   return res.status(500).json({msg: error.message || "Server error"})
   }
}

const getStudentEnrollments = async (req, res) => {
  try {
    const studentId = req.user.id
    const enrolls = await enrollements.find({ studentId }).populate("courseId");

    // Only return the courses array
    const courses = enrolls.map(e => e.courseId);

    return res.status(200).json({ data:courses });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports={enrollstudent, getStudentGrade,getStudentEnrollments}