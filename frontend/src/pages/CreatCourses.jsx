import React, { useState } from "react";
import "./style.css"
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
export default function CreatCourses() {
  const [courses, setCourses] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [courseImgUrl, setCourseImgUrl] = useState("");
  const [error, setError] = useState("");
    toastr.options={
  positionClass: "toast-top-center",
  timeOut: "3000", // 3 seconds
  progressBar: true,
  closeButton: true,
 } // for notification
  // 🔹 Saving course image Url using cloudinary
const handelSavingImage=async(e)=>{

  const file = e.target.files[0];
    if (!file) return;
    try{const formData = new FormData();
     formData.append("file", file);
     formData.append("upload_preset", "webProjectFiles");
     formData.append("folder", "course-images");

    const cloudinarydata = await axios.post(
      "https://api.cloudinary.com/v1_1/dmozntn3d/image/upload",
      formData)
      if(cloudinarydata.status===200||cloudinarydata.status===201){
      setCourseImgUrl(cloudinarydata.data.secure_url)
      console.log(courseImgUrl);
      }else{
        setError("Error saving file in clodinary")
      }
    }
    catch(error){
      console.log(error);
      setError(error.message || "Upload failed")
      
    }
      
};
const handleAddCourse = async() => {
    if (!courseTitle) return; 
  try {
    
    const response = await axios.post(
      "http://localhost:4000/courses/add-course",
      {
        title: courseTitle,
        description: courseDesc,
        courseImage: courseImgUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`, // if you use JWT
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      // Update frontend list with the created course from DB
      setCourses([...courses, response.data.course]);
       toastr.success("Course added successfully ✅");
      setCourseTitle("");
      setCourseDesc("");
      setCourseImgUrl(null);
      console.log("Course added:", response.data.course);
    }else{
      setError(response.data.msg)
    }
  } catch (error) {
    setError(`Error adding course ${error.response.data.msg}`);
    console.error("Error adding course:", error.response?.data || error.message);
  }
};
const handleAddLesson = async(coursename, lesson) => {
    setCourses(
      courses.map((c) =>
        c.title === coursename
          ? {
              ...c,
              lessons: [
                ...c.lessons,
                { ...lesson, id: Date.now(), show: true, task: null },
              ],
            }
          : c
      )
    );
   
    
};
const handleAddTask = (coursename, lessonId, task) => {
    setCourses(
      courses.map((c) =>
        c.title === coursename
          ? {
              ...c,
              lessons: c.lessons.map((l) =>
                l._id === lessonId ? { ...l, task: task } : l
              ),
            }
          : c
      )
    );
};
return(
    <div className="dashboard-main">
      {/* ================= Add Course ================= */}
      <div className="create-form">
        <h2 className="form-title">Create Course</h2>
        <label>Course Title:</label>
        <input
          type="text"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
        />
        <label>Course Description:</label>
        <textarea
          value={courseDesc}
          onChange={(e) => setCourseDesc(e.target.value)}
        />
        <label>Upload Course Image:</label>
        <input
          type="file"
          accept="image/*"
          name="courseimage"
          onChange={handelSavingImage}
        />
         {error && <div className="error">{error}</div>}
        <button className="plus-button" onClick={handleAddCourse}>
          + Add Course
        </button>
      </div>

      {/* ================= Courses ================= */}
      <div style={{ marginTop: "40px" }}>
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <h2>{course.title}</h2>
            {course.courseImage && (
              <img
                src={course.courseImage}
                alt={course.title}
                style={{ width: "200px", height: "120px", objectFit: "cover" }}
              />
            )}
            <p>{course.description}</p>
            <button
              className="toggle-btn"
              onClick={() =>
                setCourses(
                  courses.map((c) =>
                    c._id === course._id ? { ...c, show: !c.show } : c
                  )
                )
              }
            >
              {course.show ? "Hide" : "add Lessons"}
            </button>

            {course.show && (
              <LessonSection
                course={course}
                onAddLesson={handleAddLesson}
                onAddTask={handleAddTask}
              />
            )}
          </div>
        ))}
      </div>
    </div>
);
}
function LessonSection({ course, onAddLesson, onAddTask }) {
  const [error, setError] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [videoUrl, setvideoUrl] = useState("");
  const [coursename, setCoursename] = useState(course.title);
  const [taskFormVisible, setTaskFormVisible] = useState(null); // lessonId for which form is open
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [finishedUploading, setfinishedUploading] = useState(false);
  const [msg, setMsg] = useState("");
  
  const [questions, setQuestions] = useState(
    Array.from({ length: 2 }, () => ({
      text: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    })));

// 🔹 Saving videoUrl Url using cloudinary
const handelSavingvideoUrl=async(e)=>{ 
  const file = e.target.files[0];
  setfinishedUploading(false)
  setMsg("video is being uploaded please wait...")
    if (!file) return;
    try{
      console.log("here....");
      
     const formData = new FormData();
     formData.append("file", file);
     formData.append("upload_preset", "webproject");
     formData.append("folder", "lessons-videos");
   
    const cloudinarydata = await axios.post(
      "https://api.cloudinary.com/v1_1/dmozntn3d/video/upload",
      formData)
      if(cloudinarydata.status===200||cloudinarydata.status===201){
      setvideoUrl(cloudinarydata.data.secure_url)
      setfinishedUploading(true)
      setMsg("video Successfully uploaded press Add button...")
      console.log("video succfully uploded",);
      
      }else{
        setError("Error saving file in clodinary")
      }

    }
    catch(error){
      console.log(error);
      setError(error.message || "Upload failed")
      
    }
      
};
 // 🔹 Add Lesson
const handleAddLessonClick = async () => {
    if (!finishedUploading||lessonTitle) return;
  if (!videoUrl) {
    setError("Please wait until the video finishes uploading.");
    return;
  }
    try {
      console.log("you jj");
      console.log(coursename,lessonTitle,lessonContent,videoUrl);
      
      const response = await axios.post(
        "http://localhost:4000/courses/add-lesson",
        {
          courseTitle: coursename,
          title: lessonTitle,
          content: lessonContent,
          videoUrl: videoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        onAddLesson(coursename, response.data.lesson); // push lesson into parent
        console.log("Lesson added:", response.data.lesson);
         toastr.success("Lesson added successfully ✅");
        // setCoursename("")
        setLessonTitle("")
        setLessonContent("")
        setvideoUrl("")
        setError("")
      }else{
      setError(`Error adding lesson: ${ error.response.data.msg}`)
    }
    } catch (err) {
      setError(`Error adding lesson: ${ error.response.data.msg || error.message}`);
      console.error("Error adding lesson");
    }
};
// 🔹 Submit Task
const handleAddTaskSubmit = async (lessonId) => {
    try {
      // Step 1: create task
      const taskRes = await axios.post(
        "http://localhost:4000/courses/add-task",
        {
          courseId: course._id,
          lessonId,
          title: taskTitle,
          description: taskDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const taskId = taskRes.data.data._id;
      console.log(taskId);
      
      // Step 2: add questions
      for (const q of questions) {
        await axios.post(
          `http://localhost:4000/courses/add-question/${taskId}`,
          {
            text: q.text,
            options: q.options,
            correctAnswer: q.correctAnswer,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
      toastr.success("Task added successfully ✅");
      setTaskFormVisible(null);
    } catch (err) {
      setError(`Error adding task/questions: ${error.response.data.msg}`);
      console.log("Error adding task/questions:", err);
    }
};
return (
    <div className="create-form2" >
      <h3>Add New Lesson For A Course</h3>
      {error && <div className="error" >{error}</div>}
      <input
        type="text"
        placeholder="Lesson Title"
        value={lessonTitle}
        onChange={(e) => setLessonTitle(e.target.value)}
      />
       <label>Course Description:</label>
        <textarea
          value={lessonContent}
          onChange={(e) => setLessonContent(e.target.value)}
        />
      <input
        type="file"
        accept="video/*"
        onChange={handelSavingvideoUrl} 
      />
      {!finishedUploading && <p>{msg}</p>}
      {finishedUploading && <p>{msg}</p>}
      <button className="plus-button" onClick={handleAddLessonClick} disabled={!finishedUploading} >
        +
      </button>
    
      {course.lessons.map((lesson) => (
        <div key={lesson._id} className="courses-displayer" style={{ marginTop: 15 }}>
          <h4>{lesson.title}</h4>
          {lesson.videoUrl && (
         <video controls style={{ width: "200px", height: "120px" }}>
    <source src={lesson.videoUrl} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
          )}
          <p>{lesson.content}</p>

          {/* 🔹 Add Task Button */}
          <button
            className="toggle-btn"
            onClick={() =>
              setTaskFormVisible(
                taskFormVisible === lesson._id ? null : lesson._id
              )
            }
          >
            {taskFormVisible === lesson._id ? "Cancel Task" : "+ Add Task"}
          </button>

          {/* 🔹 Task Form */}
          {taskFormVisible === lesson._id && (
            <div style={{ marginTop: 15 }}>
              <h5>Create Task</h5>
              <input
                type="text"
                placeholder="Task Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <textarea
              style={{ marginTop: "20px", paddingLeft: "20px" }}
                placeholder="Task Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
              
       {error && <div className="error" >{error}</div>}

              {questions.map((q, i) => (
                <div key={i} style={{ marginTop: 10 }}>
                  <input
                    type="text"
                    placeholder={`Question ${i + 1}`}
                    value={q.text}
                    onChange={(e) => {
                      const newQ = [...questions];
                      newQ[i].text = e.target.value;
                      setQuestions(newQ);
                    }}
                  />
                  {q.options.map((opt, j) => (
                    <input
                      key={j}
                      type="text"
                      placeholder={`Option ${j + 1}`}
                      value={opt}
                      onChange={(e) => {
                        const newQ = [...questions];
                        newQ[i].options[j] = e.target.value;
                        setQuestions(newQ);
                      }}
                    />
                  ))}
                  <input
                    type="text"
                    placeholder="Correct Answer"
                    value={q.correctAnswer}
                    onChange={(e) => {
                      const newQ = [...questions];
                      newQ[i].correctAnswer = e.target.value;
                      setQuestions(newQ);
                    }}
                  />
                </div>
              ))}

              <button onClick={() => handleAddTaskSubmit(lesson._id)}>
                Submit Task
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
);
}
