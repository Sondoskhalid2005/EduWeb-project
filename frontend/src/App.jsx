import { BrowserRouter,Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp"
import Login from "./pages/login";
import HomePage from "./pages/Home"
import AddLesson from "./pages/addlesson"
import Courses from "./pages/allCourses";
import Dashboard from "./pages/dashbord";
import Chatbot from "../src/components/Chatbot"
import StudentProfile from "./pages/StudentProfile";
import CreatCourses from "./pages/CreatCourses";
import IntstructorProfile from "./pages/InstructorProfile";
import Footer from "../src/components/footer";
import InstructorDashbord from "./pages/InstructorDashbord"
import Navbar from "../src/components/navbar";
import InstructorCourses from "./pages/InstructorCourses"
import QuizPage from "./pages/QuizPage";
import "./pages/style.css"
import Logout from "./pages/Logout";
 function App(){
 return(
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/addlesson" element={<AddLesson />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/creat-courses" element={<CreatCourses />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/teacher-profile" element={<IntstructorProfile />} />
        <Route path="/teacher-dashbord" element={<InstructorDashbord />} />
        <Route path="/my-courses" element={<InstructorCourses />} />
        <Route path="/logout" element={<Logout />} />
         <Route path="/quiz/:lessonId" element={<QuizPage />} />
        
      </Routes>
      <Footer />
        <Chatbot />
    </BrowserRouter>

    );
  
}

export default App;
