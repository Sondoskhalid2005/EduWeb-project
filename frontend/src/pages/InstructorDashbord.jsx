import React, { useState, useEffect } from "react";
import {useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function InstructorDashbord(){
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const courseId=  sessionStorage.getItem("showedcourseid")
  const courseName=   sessionStorage.getItem("showedcoursename")
   const course=  sessionStorage.getItem("showedcourse")
  const [lessons, setlessons] = useState([]);
  const [selectlesson, setselectlesson] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
   const fun=async()=>{ 
       try{
        // console.log(sessionStorage.getItem("enrolledcourseid"));
        
        const response = await axios.get(`http://localhost:4000/courses/${courseId}`,{
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
          },)

           if (response.status === 201 || response.status === 200) {
            setlessons(response.data.data)
          console.log("lessons fetched successfully !");
           setselectlesson(response.data.data[0]);
        }
              setError("failed to fetch lessons !");
            }catch(error){
                console.log(error);
                 setError("error ")
              }
            }
 
  fun();
   }, [sessionStorage.getItem("courseId")]);
  return (
    <div className="dashboard">
      {sidebarVisible && (
        <div className="dashboard-sidebar">
          <h2>Course Lessons</h2>
          <ul>
            {lessons.length === 0 && <li>No Lessons yet</li>}
            {lessons.map(lesson => (
              <li
                key={lesson._id}
                className={selectlesson?._id === lesson._id ? "active" : ""}
                onClick={() =>{setselectlesson(lesson)}}
              >
                {`Lesson ${lesson.position}`}
                <div>
                  {/* <div className="progress" style={{ width: `${course.progress}%` }}></div> */}
                </div>
              </li>
            ))}
            <li className="extra-link">
            <Link to="/addlesson">Add New Lessson !</Link>
          </li>
          </ul>
        </div>
      )}

      <div className="dashboard-main">
        <button
          className="toggle-btn"
          onClick={() => setSidebarVisible(!sidebarVisible)}
        >
          {sidebarVisible ? "Hide Lessons" : "Show Lessons"}
        </button>

        {selectlesson ? (
          <div className="course-detail">
            <h2>{selectlesson.title}</h2>
            {/* <p>{selectlesson.content}</p> */}
            <video controls width="70%">
  <source src={selectlesson.videoUrl} type="video/mp4" />Your browser does not support the video tag.</video>
  
 <h2>{`Lesson Material:${selectlesson.content}`}</h2>
          </div>
        ) : (
          <p>Select a Lesson to view .</p>
        )}
        
        
      </div>
    </div>
  );
}

