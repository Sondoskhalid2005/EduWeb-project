import { Link } from "react-router-dom";
import "../pages/style.css";

export default function Navbar() {
    const role = sessionStorage.getItem("role"); 
    console.log(role);
    
  const profileRoute =
    role === "instructor" ? "/teacher-profile" :
    role === "student" ? "/student-profile" :
    "/login"; 
  return (
    <nav className="eduweb-nav">

      <Link to={profileRoute}>Profile</Link>
      <Link to="/courses">Courses</Link>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">SignUp</Link>
    </nav>
  );
}