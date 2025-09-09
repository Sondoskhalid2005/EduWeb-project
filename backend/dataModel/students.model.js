const mongoose=require('mongoose')
const submissionSchema=require("./submissions.js")
const studentSchema= new mongoose.Schema({
username: {
    type : String ,
    required: true ,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  taskSubmissions:[ {
    type: mongoose.Schema.Types.ObjectId,
     ref: "Submissions" 
    }]

})
module.exports = mongoose.model("Students", studentSchema);
 
