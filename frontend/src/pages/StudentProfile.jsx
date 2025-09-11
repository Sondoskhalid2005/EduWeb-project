import React, {useEffect,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
export default function StudentProfile() {
    const navigate = useNavigate();
const [error, setError] = useState("");
const [courses, setcourses] = useState([]);
  const username=sessionStorage.getItem("username")
  const email=sessionStorage.getItem("email")
  const role=sessionStorage.getItem("role")
useEffect(() => {
  const fetchCourses = async () => {
try{
    const response =  await axios.get("http://localhost:4000/student/my-enrollments",
          {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
          },)

 setcourses(response.data.data||[])
 console.log(response.data.data);
 
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
    sessionStorage.setItem("enrolledcourseid",course._id)
navigate("/dashboard", { state: { course } });
};
  return (
    <>
    
      <div className="eduweb-container">
       <Link to="/logout" className="extra-link2">Log Out</Link>
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

    {error && <p className="error">{error}</p>}
     <div className="courses-page2">
      <h1 className="courses-title">My Enrollments</h1>
      <div className="courses-grid">
        {
        courses.filter((course)=>course).map((course) => (
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
          {/* <h3>{`Dr.${course.title}`}</h3> */}
          {/* <h3>{course.description}</h3> */}
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
