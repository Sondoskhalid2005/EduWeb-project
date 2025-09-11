import React, { useState, useEffect } from "react";
import {useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Quiz from "./QuizPage";
import { Link } from "react-router-dom";
export default function Dashboard(){
  const location = useLocation();
  const navigate = useNavigate();
  const courseFromEnroll = location.state?.course || null;
  const [error, setError] = useState("");
  const [lessons, setlessons] = useState([]);
  const [selectlesson, setselectlesson] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
   const fun=async()=>{ 
       try{
        console.log(sessionStorage.getItem("enrolledcourseid"));
        
        const response = await axios.get(`https://eduweb-project.onrender.com/courses/${sessionStorage.getItem("enrolledcourseid")}`,{
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
          },)

           if (response.status === 201 || response.status === 200) {
            setlessons(response.data.data)
          console.log("lessons fetched successfully !");
           //navigate("/lesson", { state: { lessons } });
           setselectlesson(response.data.data[0]);
        }
              setError("failed to fetch lessons !");
            }catch(error){
                console.log(error);
                 setError("error ")
              }
            }
 
  fun();
   }, [sessionStorage.getItem("enrolledcourseid")]);
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
                {/* <div>
                  <div className="progress" style={{ width: `${50}%` }}></div>
                </div> */}
              </li>
            ))}
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
          <div className="video-container">
            <h2  className="lesson-title">{selectlesson.title}</h2>
             <p  className="lesson-description">{`Lesson discription :${selectlesson.content}`}</p>
            {/* <p>{selectlesson.content}</p> */}
            <video  controls width="70%">
  <source src={selectlesson.videoUrl} type="video/mp4" />Your browser does not support the video tag.</video>
 
  {!selectlesson.task && (
  <Link 
    to={`/quiz/${selectlesson._id}`} 
    className="extra-link"
  >
   Take  Quiz !
  </Link>
)}

          </div>
        ) : (
          <p >Select a Lesson to view .</p>
        )}
        
        
      </div>
    </div>
  );
}

