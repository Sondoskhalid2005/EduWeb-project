import {useNavigate, Link } from "react-router-dom";
import React,{ useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

export default function IntstructorProfile() {
  const username=sessionStorage.getItem("username")
  const email=sessionStorage.getItem("email")
  const role=sessionStorage.getItem("role")
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [courses, setcourses] = useState([]);
  
  useEffect(() => {
  const fetchCourses = async () => {
try{
    const response =  await axios.get("http://eduweb-project.onrender.com/courses/my-courses",
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
const handleShow = async(course) => {
    sessionStorage.setItem("showedcourseid",course._id)
    sessionStorage.setItem("showedcoursename",course.title)
    sessionStorage.setItem("showedcourse",course)
navigate("/teacher-dashbord", { state: { course } });
};
  return (
    <>
      <div className="eduweb-container">
<Link to="/logout" className="extra-link2">Log Out</Link>
<Link to="/creat-courses" className="extra-link3">Creat New Course!</Link>
        <section className="profile-container">
          <div >
            <h1 >My Profile</h1>
            <img
                src="/profileimg.png"
                style={{ width: "200px", height: "120px", objectFit: "cover" }}
              />
            <p><strong>UserName:</strong> {username}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Role:</strong> {role} in EDUWEB</p>
            
          </div>
        </section>

         <div className="courses-page2">
    {error && <p className="error">{error}</p>}
      <h1 className="courses-title">My created Courses</h1>
      <div className="courses-grid">
        {
        courses.map((course) => (
        <div className="edu-card1" key={course._id}>
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
          {/* <p>{course.description}</p> */}
          <button 
            className="cta-button" 
            onClick={() => handleShow(course)}>
            Show Course
            </button>
          </div>
        ))
        }
      </div>
    </div>

      
      </div>

    </>
  );
}
