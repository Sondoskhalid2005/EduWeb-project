require('dotenv').config()
const express = require("express")
const mongodb=require('mongoose')
const cors=require("cors")
const app = express()
const authrouter=require('../backend/routes/auth.routes')
const instructorRouter=require('./routes/instructor.routes')
const studentsRouter=require('./routes/students.routes')
const coursesRouter=require('./routes/course.routes')
const chatbotRoutes = require('./routes/chatbot.routes.js');

app.use(express.json())
app.use(cors()) // to connect back with front
console.log(process.env.PORT || 4000)

mongodb.connect(process.env.URL)
    .then(()=>{
     app.listen(process.env.PORT || 4000, ()=>{
    console.log("connected to the server successfuly")}) 
        })
    .catch((error)=>{console.log("error connecting to database!")})
    

app.use("/auth",authrouter)
app.use("/courses",instructorRouter,coursesRouter )
app.use("/student",studentsRouter)
app.use("/api/chat", chatbotRoutes);

