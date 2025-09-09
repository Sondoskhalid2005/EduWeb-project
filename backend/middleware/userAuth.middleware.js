const instructorAuth=(req,res,next)=>{
   
    if (req.user.role !== "instructor") {
      return res.status(403).json({ msg: "Only instructors can use this route" });
    }
    
   next()
}
const studentAuth=(req,res,next)=>{
      if (req.user.role !== "student") {
      return res.status(403).json({ msg: "Only students can use this route" });
    }
    next()
}
module.exports={instructorAuth,studentAuth}