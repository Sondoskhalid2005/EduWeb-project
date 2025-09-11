import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
export default function QuizPage() {
  const { lessonId } = useParams()||sessionStorage.setItem("lessonid");
  const [userAnswers, setUserAnswers] = useState([])
  const [taskDescription, settaskDescription] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 const [taskTitle,setTaskTitle] = useState("");
  const [taskId, setTaskId] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
 toastr.options={
  positionClass: "toast-top-center",
  timeOut: "10000000", // 3 seconds
  progressBar: true,
  closeButton: true,
 } // for notification
  useEffect(() => {
    if (lessonId) {
      fetchTask();
    }
  }, [lessonId]);
const fetchTask = async () => {
     try{ console.log("lesson id ", lessonId,sessionStorage.getItem("token"));
      
      const res = await axios.post(
        `https://eduweb-project.onrender.com/courses/task-questions/${lessonId}`,{
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
          },

      );
      console.log(res.status);
      
      if(res.status===200||res.status===201)
        { 
      setTaskTitle(res.data.taskTitle);    
      settaskDescription(res.data.taskDescription);
      setTaskId(res.data.taskId)
      setQuestions(res.data.data);
      setError("")
      console.log(res.data.taskTitle,res.data.taskDescription,res.data.data);
    }
    else{
      setError(`error getting task : ${ error.res?.data?.msg}`)
    }
  }catch(error){
    setError(`Error getting task: ${ error.res?.data?.msg || error.message}`);
      console.error("error getting lesson task 500 ");
    }
};

const handleCheckboxChange = (optionValue)=>{
setUserAnswers(prev => [...prev , optionValue])
console.log(userAnswers);

}
const getgrade = async(e)=>{
   e.preventDefault() //prevent refreshing the page
    setError("");
  try{
    console.log(taskId,userAnswers);
    
const res = await axios.post(
       `https://eduweb-project.onrender.com/student/get-grade/${taskId}`,
       {studentAnswers:userAnswers},
       {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          },
        }
      );
      console.log(res.status);
      
      if(res.status===200||res.status===201)
        { 
      setScore(res.data.grade);    
      setError("")
      console.log(res.data.grade);
      if(res.data.grade===questions.length){
        toastr.success(`✅ Task solved successfully, YOU GoT THE FULL MARK !`)
      }else if(res.data.grade===0) {
        toastr.error(` Task submitted , you got 0 unfortunatly !`)
      }else{
        toastr.success(`✅ Task solved successfully! Your grade is: ${res.data.grade}`)
      }
    }
    else{
      setError(`error getting grade : ${ error.res?.data?.msg}`)
    }
  }catch(error){
    // setError(`Error getting grade: ${ error.res?.data?.msg || error.message}`);
    toastr.error("Error while getting grade", "Error")
      console.error("error getting lesson grade ");
    }
}

if (!taskTitle) return <p>Loading quiz...</p>;
  return (
    <div className="quiz-page">
    <form onSubmit={getgrade}>
      <h1 className="page-title">Quiz Form</h1>
      {/* <h1 className="task-title">Lesson Task</h1> */}
       {error && <div className="error" >{error}</div>}

              {questions.map((q, i) => (
                <div key={i} style={{ marginTop: 10 }}>
                  <h2>{i + 1}. {q.text}</h2>
                  {q.options.map((opt, j) => (
                     <div key={j} style={{ marginLeft: 20, marginTop: 5 }}>
                    <input className="options"
          type="checkbox"
          value={`opt${i}`}
         checked={userAnswers.includes(opt) || false}
          onChange={() => handleCheckboxChange(opt)}
          // className="w-4 h-4"
        />
        <span className="options"style={{ marginLeft: 8 }}>{opt}</span>
        
     </div>
       ))}
     </div>
   ))}
   <button type="submit">Submit Quiz </button>
   </form>
 </div>
);}