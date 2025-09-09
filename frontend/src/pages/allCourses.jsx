import React,{ useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Courses(){
const navigate = useNavigate();
const [error, setError] = useState("");
const [courses, setcourses] = useState([]);
useEffect(() => {
  const fetchCourses = async () => {
try{
    const response =  await axios.get("http://localhost:4000/courses/get-courses",
          {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
          },)

 setcourses(response.data.courses||[])
  if (response.status === 201 || response.status === 200) {
          console.log("successful retreiving all courses !");
        } else setError("failed show courses !");
            }catch(error){
              
                console.log(error);
                 setError(`Error inrolling: ${ error.response.data.msg|| error.message}`)
              }
            }
             fetchCourses();
}, []);
const handleEnroll = async(course) => {
    try{
      sessionStorage.setItem("enrolledcourseid",course._id)
        console.log(sessionStorage.getItem("token"));
        
        const response = await axios.post(`http://localhost:4000/student/inroll-student/${course._id}`,{},{
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
          },)
          console.log("heremmm");
          
           if (response.status === 201 || response.status === 200) {
          console.log("student inrolled succeffully in course !");
           navigate("/dashboard", { state: { course } });
        }else {
  setError("failed to inroll student in course !");
}
            }catch(error){
                console.log(error);
                 setError(`Error inrolling: ${ error.response.data.msg|| error.message}`)
              }
};
  return (
    <div className="courses-page">
    {error && <p className="error">{error}</p>}
      <h1 className="courses-title">Our Courses</h1>
      <div className="courses-grid">
        {
        courses.map((course) => (
        <div className="edu-card" key={course._id}>
          <img
            src={course.courseImage || "/defaultImage.jpg"}
            alt={course.title}
            className="course-img"
            onError={(e) => { // if no image found add the default image
    if (e.target.src !== window.location.origin + "/defaultImage.jpg") {
      e.target.src = "/defaultImage.jpg";
    }}}
          />
          <h2>{course.title}</h2>
          <h3>{`Dr.${course.instructorName}`}</h3>
          <p>{course.description}</p>
          <button 
            className="cta-button" 
            onClick={() => handleEnroll(course)}
          >
            Enroll
            </button>
          </div>
        ))
        }
      </div>
    </div>
  );
};
