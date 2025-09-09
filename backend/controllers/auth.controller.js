const studentbd=require('../dataModel/students.model')
const instructordb=require('../dataModel/instructors.model')
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken")
const tokenStore = { // save current token and list of loged out token(expired tokens)
  blacklist: [],
  currentToken: null,
};

const signup =async(req,res)=>{
    const {role,username,email,password}=req.body
    const newstudent= await studentbd.findOne({email})
    const newinstructor= await instructordb.findOne({email})
    console.log(newstudent, newinstructor);
    
    try{
        if(newstudent==null & newinstructor==null){ 
         const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        if(role=="student"){

        const newstudents=new studentbd({username:username,email:email, password:hashedPassword})
        await newstudents.save();
        return res.status(201).send( 
            {
            msg: "student registered successfully!" ,
            "student name": newstudents.username,
            "student email": newstudents.email,
            "student id": newstudents._id,
            })
        }
      else if(role=="instructor"){

      const newinstructor=new instructordb({username:username,email:email, password:hashedPassword})
      await newinstructor.save();
      return res.status(201).send( 
            {
            msg: "instructor registered successfully!" ,
            "teacher name": newinstructor.username,
            "teacher email": newinstructor.email,
            "teacher id": newinstructor._id,
            })
      }
      }
      else{

        return res.status(404).json({msg:"this email is taken please change it"})
      }
    }catch(error){
        return res.status(500).json(error.message)
      }
}

const login = async (req,res) => {
  const {email, password} = req.body;
  tokenStore.blacklist.length=0; // remove old saved token from blacklist
  try {
    // check if user is student or instructor
    const student = await studentbd.findOne({email});
    const instructor = await instructordb.findOne({email});

    const user = student || instructor; 

    if(!user){
      return res.status(404).json({msg:"User not found"});
    }

    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({msg:"Invalid credentials"});
    }

    // create JWT token
    const token = jwt.sign(
      { id: user._id, role: student ? "student" : "instructor",username:user.username },
      process.env.JWT_SECRET, // keep secret in .env
      { expiresIn: "1h" }
    );
    tokenStore.currentToken=token; 

    return res.status(200).json({
      msg: "Login successful",
      token: token,
      id: user._id,
      username: user.username,
      email: user.email,
      role: student ? "student" : "instructor"
    });

  } catch (error) {
    return res.status(500).json(error.message);
  }
}

const logout = async (req, res) => {
  try {
  if(tokenStore.currentToken){ // if current token exists push it in blacklist to logout 
  tokenStore.blacklist.push(tokenStore.currentToken)
  return res.status(200).json({ msg: "Logged out successfully" });
}
  return res.status(404).json({ msg: "Logging out failed" });

  }catch (error) {
    return res.status(500).json(error.message);
  }
}


module.exports= {signup,login,logout, tokenStore};