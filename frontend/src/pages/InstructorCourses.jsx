import React,{ useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function InstructorCourses(){
const navigate = useNavigate();
const [error, setError] = useState("");
const [courses, setcourses] = useState([]);
useEffect(() => {
  const fetchCourses = async () => {
try{
    const response =  await axios.get("http://localhost:4000/courses/my-courses",
          {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
          },)

 setcourses(response.data.data||[])
 console.log(courses);
 
  if (response.status === 201 || response.status === 200) {
          console.log("successful retreiving all courses !");
        } else setError("failed show courses !");
            }catch(error){
                console.log(error);
                 setError("error")
              }
            }
             fetchCourses();
}, []);

  return (
    <div className="courses-page">
    {error && <p className="error">{error}</p>}
      <h1 className="courses-title">My Added Courses</h1>
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
          </div>
        ))
        }
      </div>
    </div>
  );
};
